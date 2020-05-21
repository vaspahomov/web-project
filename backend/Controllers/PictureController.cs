using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : Controller
    {
        private readonly IPictureModificator _modifier;
        private readonly IPictureRepository _pictureRepository;
        private readonly IUserRepository _userRepository;

        private Picture GetPictureFromFormFile(IFormFile file)
        {
            var ms = new MemoryStream();
            file.CopyToAsync(ms);
            return new Picture(ms, file.FileName);
        }

        public PictureController(IPictureModificator modifier, IPictureRepository pictureRepository,
            IUserRepository userRepository)
        {
            _modifier = modifier;
            _pictureRepository = pictureRepository;
            _userRepository = userRepository;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<PictureEntity>> UploadFile(IFormFile file)
        {
            var picture = GetPictureFromFormFile(file);
            var pictureEntity = await _pictureRepository.Save(picture);
            //TODO: get user from auth info
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (user != null)
            {
                var userId = new Guid(user);
                await _userRepository.AddPictureAsync(userId, pictureEntity, DateTime.Now);
            }

            return pictureEntity;
        }

        [HttpGet("download/{id}")]
        public async Task<ActionResult<Picture>> DownloadFile(string id)
        {
            var entity = new PictureEntity(new ObjectId(id));
            var picture = await _pictureRepository.Get(entity);
            if (picture != null)
                return Ok(picture);
            return NotFound();
        }

        [HttpGet("users/download/{userId}")]
        public async Task<ActionResult<IEnumerable<Picture>>> DownloadAllForUser(Guid userId)
        {
            var ids = await _userRepository.GetUserPictures(userId);
            var pics = ids.Select(id => _pictureRepository.Get(id));
            return Ok(await Task.WhenAll(pics));
        }

        [HttpPatch("user/{userId}/rotation/{id}")]
        public async Task<ActionResult<PictureEntity>> Rotate(Guid userId, string id, float degrees) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.Rotate(pic, degrees));

        [HttpPatch("user/{userId}/text_addition/{id}")]
        public async Task<ActionResult<PictureEntity>> AddText(Guid userId, string id, string text) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.AddText(pic, text));

        [HttpPatch("user/{userId}/crop/{id}")]
        public async Task<ActionResult<PictureEntity>> AddText(Guid userId, string id, [FromBody] CropRectangle rectangle) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.Crop(pic, rectangle));

        [HttpPatch("user/{userId}/gaussian_blur/{id}")]
        public async Task<ActionResult<PictureEntity>> AddGaussianBlur(Guid userId, string id, int size) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.AddGaussianBlur(pic, size));

        [HttpPatch("user/{userId}/circular_blur/{id}")]
        public async Task<ActionResult<PictureEntity>> AddCircularBlur(Guid userId, string id) =>
            await ModifyPictureAndSaveForUser(userId, id, _modifier.AddCircularBlur);

        [HttpPatch("user/{userId}/sepia_filter/{id}")]
        public async Task<ActionResult<PictureEntity>> AddSepiaFilter(Guid userId, string id) =>
            await ModifyPictureAndSaveForUser(userId, id, _modifier.AddSepiaFilter);

        [HttpPatch("user/{userId}/black_and_white_filter/{id}")]
        public async Task<ActionResult<PictureEntity>> AddBnWFilter(Guid userId, string id) =>
            await ModifyPictureAndSaveForUser(userId, id, _modifier.AddBlackAndWhiteFilter);


        private async Task<ActionResult<PictureEntity>> ModifyPictureAndSaveForUser(Guid userId, string id, Func<Picture, Picture> f)
        {
            //TODO: add converter between PictureEntity ObjectId and Guid
            var entity = new PictureEntity(new ObjectId(id));
            var picture = await _pictureRepository.Get(entity);
            if (picture == null)
                return NotFound();
            var modified = f(picture);
            var savedId = await _pictureRepository.Save(modified);
            await _userRepository.AddPictureAsync(userId, savedId, DateTime.Now);
            return savedId;
        }
    }
}