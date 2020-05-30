using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Data.Entities;
using backend.Data.Repositories;
using backend.Services;
using ImageProcessor.Processors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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

    [Authorize]
    [Route("api/pictures")]
    [ApiController]
    public class PictureController : Controller
    {
        private readonly IPictureModificator _modifier;
        private readonly IPictureRepository _pictureRepository;
        private readonly IUserRepository _userRepository;

        private Picture GetPictureFromFormFile(IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyToAsync(ms);
                return new Picture(ms.ToArray(), file.FileName);
            }
        }

        public PictureController(IPictureModificator modifier, IPictureRepository pictureRepository,
            IUserRepository userRepository)
        {
            _modifier = modifier;
            _pictureRepository = pictureRepository;
            _userRepository = userRepository;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<string>> UploadFile(IFormFile file)
        {
            var picture = GetPictureFromFormFile(file);
            Console.WriteLine(picture.AsBytes.Length);
            var pictureEntity = await _pictureRepository.Save(picture);
            //TODO: get user from auth info
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (user != null)
            {
                var userId = new Guid(user);
                await _userRepository.AddPictureAsync(userId, pictureEntity, DateTime.Now);
            }

            return pictureEntity.Id.ToString();
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
            var entity = new PictureEntity(new ObjectId(id));
            var picture = await _pictureRepository.Get(entity);
            if (picture != null)
                return File(picture.AsBytes, "image/jpeg");
            return NotFound();
        }

        [HttpGet("/")]
        public async Task<ActionResult<IEnumerable<Picture>>> DownloadAllForUser()
        {
            var user = GetUser();
            if (user == null)
                return NotFound();
            var userId = user.Value;
            var ids = await _userRepository.GetUserPictures(userId);
            var pics = ids.Select(id => _pictureRepository.Get(id));
            return Ok(await Task.WhenAll(pics));
        }

        [HttpPost("{id}/rotate")]
        public async Task<ActionResult<PictureEntity>> Rotate([FromRoute] string id, [FromBody] float angle) =>
            await ModifyPictureAndSaveForUser(id, pic => _modifier.Rotate(pic, angle));

        [HttpPost("{id}/addText")]
        public async Task<ActionResult<PictureEntity>> AddText(string id, string text) =>
            await ModifyPictureAndSaveForUser(id, pic => _modifier.AddText(pic, text));

        [HttpPost("{id}/crop")]
        public async Task<ActionResult<PictureEntity>> AddText(string id, [FromBody] CropRectangle rectangle) =>
            await ModifyPictureAndSaveForUser(id, pic => _modifier.Crop(pic, rectangle));

        [HttpPost("{id}/blur")]
        public async Task<ActionResult<PictureEntity>> AddBlur(string id, [FromBody] int size, [FromBody] BlurType type)
        {
            return type switch
            {
                BlurType.Gaussian => await ModifyPictureAndSaveForUser(id, pic => _modifier.AddGaussianBlur(pic, size)),
                BlurType.Circular => await ModifyPictureAndSaveForUser(id, _modifier.AddCircularBlur),
                _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }

        [HttpPost("{id}/filter")]
        public async Task<ActionResult<PictureEntity>> AddFilter(string id, [FromBody] FilterType type)
        {
            return type switch
            {
                FilterType.Sepia => await ModifyPictureAndSaveForUser(id, _modifier.AddSepiaFilter),
                FilterType.BlackAndWhite => await ModifyPictureAndSaveForUser(id, _modifier.AddBlackAndWhiteFilter),
                _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }

        private async Task<ActionResult<PictureEntity>> ModifyPictureAndSaveForUser(string id, Func<Picture, Picture> f)
        {
            //TODO: add converter between PictureEntity ObjectId and Guid
            var user = GetUser();
            if (user == null)
                return NotFound();
            var userId = user.Value;
            var entity = new PictureEntity(new ObjectId(id));
            var picture = await _pictureRepository.Get(entity);
            if (picture == null)
                return NotFound();
            var modified = f(picture);
            var savedId = await _pictureRepository.Save(modified);
            await _userRepository.AddPictureAsync(userId, savedId, DateTime.Now);
            return File(modified.AsBytes, "image/jpeg");
        }
    }
}