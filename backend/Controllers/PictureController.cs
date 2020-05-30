using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Data.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace backend.Controllers
{
    public enum BlurType
    {
        Gaussian,
        Circular
    }

    public enum FilterType
    {
        Sepia,
        BlackAndWhite
    }

    public class PictureMetaResponse
    {
        public PictureMetaResponse(string filename)
        {
            Filename = filename;
        }

        public string Filename { get; set; }
    }


    [Authorize]
    [Route("api/pictures")]
    [ApiController]
    public class PictureController : Controller
    {
        private readonly IPictureModificator _modifier;
        private readonly IPictureRepository _pictureRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<PictureController> _logger;

        private static (byte[] imageData, string name) GetPictureFromFormFile(IFormFile file)
        {
            using var ms = new MemoryStream();
            file.CopyToAsync(ms);
            return (ms.ToArray(), file.FileName);
        }

        public PictureController(IPictureModificator modifier, IPictureRepository pictureRepository,
            IUserRepository userRepository, ILogger<PictureController> logger)
        {
            _modifier = modifier;
            _pictureRepository = pictureRepository;
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<string>> UploadFile(IFormFile file)
        {
            var (imgData, name) = GetPictureFromFormFile(file);
            _logger.LogInformation("Uploading picture");
            var picture = await _pictureRepository.Save(imgData, name);
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _logger.LogWarning($"Did not find the user for image {file.FileName}");
            if (user == null) return picture.Id.ToString();
            var userId = new Guid(user);
            _logger.LogInformation($"User was not found; Created user {userId}");
            await _userRepository.AddPictureAsync(userId, picture, DateTime.Now);
            return picture.Id.ToString();
        }

        private Guid? GetUser()
        {
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (user != null)
                return new Guid(user);
            return null;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<byte[]>> DownloadFile([FromRoute] string id)
        {
            var entity = new ObjectId(id);
            var picture = await _pictureRepository.Get(entity);
            if (picture != null)
                return File(picture.AsBytes, "image/jpeg");
            return NotFound();
        }

        [HttpGet("{id}/meta")]
        public async Task<ActionResult<PictureMetaResponse>> GetImageMeta([FromRoute] string id)
        {
            var entity = new PictureEntity(new ObjectId(id));
            var picture = await _pictureRepository.Get(entity);
            if (picture != null)
                return new PictureMetaResponse(picture.Filename);
            return NotFound();
        }


        public class DownloadResponse
        {
            public DownloadResponse(string id, string filename, int height, int width)
            {
                Id = id;
                Filename = filename;
                Height = height;
                Width = width;
            }

            [JsonProperty("id")] public string Id { get; set; }
            [JsonProperty("filename")] public string Filename { get; set; }
            [JsonProperty("height")] public int Height { get; set; }
            [JsonProperty("width")] public int Width { get; set; }
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<DownloadResponse>>> DownloadAllForUser()
        {
            var user = GetUser();
            if (user == null)
                return NotFound();
            var userId = user.Value;
            _logger.LogInformation($"{userId}");
            var entities = await _userRepository.GetUserPictures(userId);
            var ids = entities.Select(e => new DownloadResponse(e.Id.ToString(), e.Name, e.Height, e.Width));
            return Ok(ids);
        }

        public class RotateRequest
        {
            [JsonProperty("angle")] public float Angle { get; set; }
        }

        [HttpPost("{id}/rotate")]
        public async Task<ActionResult<PictureEntity>> Rotate([FromRoute] string id, [FromBody] RotateRequest req) =>
            await ModifyPictureAndSaveForUser(id, pic => _modifier.Rotate(pic, req.Angle));

        public class AddTextRequest
        {
            [JsonProperty("text")] public string Text { get; set; }
        }

        [HttpPost("{id}/addText")]
        public async Task<ActionResult<PictureEntity>> AddText([FromRoute] string id, [FromBody] AddTextRequest req) =>
            await ModifyPictureAndSaveForUser(id, pic => _modifier.AddText(pic, req.Text));

        public class CropRequest
        {
            [JsonProperty("rectangle")] public CropRectangle Rectangle { get; set; }
        }

        [HttpPost("{id}/crop")]
        public async Task<ActionResult<PictureEntity>> AddText(string id, [FromBody] CropRequest req) =>
            await ModifyPictureAndSaveForUser(id, pic => _modifier.Crop(pic, req.Rectangle));

        public class BlurRequest
        {
            public int Size { get; set; }
            public BlurType Type { get; set; }
        }

        [HttpPost("{id}/blur")]
        public async Task<ActionResult<PictureEntity>> AddBlur(string id, [FromBody] BlurRequest req)
        {
            return req.Type switch
            {
                BlurType.Gaussian => await ModifyPictureAndSaveForUser(id,
                    pic => _modifier.AddGaussianBlur(pic, req.Size)),
                BlurType.Circular => await ModifyPictureAndSaveForUser(id, _modifier.AddCircularBlur),
                _ => BadRequest("invalid type")
            };
        }

        public class FilterRequest
        {
            public FilterType Type { get; set; }
        }

        [HttpPost("{id}/filter")]
        public async Task<ActionResult<PictureEntity>> AddFilter(string id, [FromBody] FilterRequest req)
        {
            return req.Type switch
            {
                FilterType.Sepia => await ModifyPictureAndSaveForUser(id, _modifier.AddSepiaFilter),
                FilterType.BlackAndWhite => await ModifyPictureAndSaveForUser(id, _modifier.AddBlackAndWhiteFilter),
                _ => BadRequest("invalid type")
            };
        }

        private async Task<ActionResult<PictureEntity>> ModifyPictureAndSaveForUser(string id, Func<Picture, Picture> f)
        {
            var user = GetUser();
            if (user == null)
                return NotFound();
            var userId = user.Value;
            var pictureId = ObjectId.Parse(id);
            var picture = await _pictureRepository.Get(pictureId);
            if (picture == null)
                return NotFound();
            var modified = f(picture);
            var saved = await _pictureRepository.TryUpdate(modified, pictureId);
            if (!saved)
                return BadRequest("Что-то пошло не так во время сохранения картинки в Монгу");
            await _userRepository.AddPictureAsync(userId, picture, DateTime.Now);
            return File(modified.AsBytes, "image/jpeg");
        }
    }
}