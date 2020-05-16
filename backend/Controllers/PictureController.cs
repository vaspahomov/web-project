using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Services;
using ImageProcessor.Processors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<Guid>> UploadFile(IFormFile file)
        {
            var picture = GetPictureFromFormFile(file);
            return await _pictureRepository.Save(picture);
        }

        [HttpGet("download/{id}")]
        public async Task<ActionResult<Picture>> DownloadFile(Guid id)
        {
            var actionResult = await _pictureRepository.Get(id);
            if (actionResult != null)
                return actionResult;
            return NotFound();
        }

        [HttpGet("users/download/{userId}")]
        public async Task<ActionResult<IEnumerable<Picture>>> DownloadAllForUser(Guid userId)
        {
            var ids = await _userRepository.GetImageIdsForUser(userId);
            var pics = ids.Select(id => _pictureRepository.Get(id));
            return Ok(await Task.WhenAll(pics));
        }

        [HttpPatch("for/{userId}/rotate/{id}")]
        public async Task<ActionResult<Guid>> Rotate(Guid userId, Guid id, float degrees) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.Rotate(pic, degrees));

        [HttpPatch("for/{userId}/text/{id}")]
        public async Task<ActionResult<Guid>> AddText(Guid userId, Guid id, string text) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.AddText(pic, text));

        [HttpPatch("for/{userId}/crop/{id}")]
        public async Task<ActionResult<Guid>> AddText(Guid userId, Guid id, [FromBody] CropRectangle rectangle) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.Crop(pic, rectangle));

        [HttpPatch("for/{userId}/blur/gaussian/{id}")]
        public async Task<ActionResult<Guid>> AddGaussianBlur(Guid userId, Guid id, int size) =>
            await ModifyPictureAndSaveForUser(userId, id, pic => _modifier.AddGaussianBlur(pic, size));

        [HttpPatch("for/{userId}/blur/circular/{id}")]
        public async Task<ActionResult<Guid>> AddCircularBlur(Guid userId, Guid id) =>
            await ModifyPictureAndSaveForUser(userId, id, _modifier.AddCircularBlur);

        [HttpPatch("for/{userId}/sepia/{id}")]
        public async Task<ActionResult<Guid>> AddSepiaFilter(Guid userId, Guid id) =>
            await ModifyPictureAndSaveForUser(userId, id, _modifier.AddSepiaFilter);

        [HttpPatch("for/{userId}/black_and_white/{id}")]
        public async Task<ActionResult<Guid>> AddBnWFilter(Guid userId, Guid id) =>
            await ModifyPictureAndSaveForUser(userId, id, _modifier.AddBlackAndWhiteFilter);


        private async Task<ActionResult<Guid>> ModifyPictureAndSaveForUser(Guid userId, Guid id, Func<Picture, Picture> f)
        {
            var picture = await _pictureRepository.Get(id);
            if (picture == null)
                return NotFound();
            var modified = f(picture);
            var savedId = await _pictureRepository.Save(modified);
            await _userRepository.AddImageForUser(userId, savedId, DateTime.Now);
            return savedId;
        }
    }
}