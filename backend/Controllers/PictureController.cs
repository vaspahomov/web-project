using System;
using System.Threading.Tasks;
using backend.Data;
using backend.Services;
using ImageProcessor.Processors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : Controller
    {
        private readonly IPictureModificator _modifier;
        private readonly IPictureRepository _pictureRepository;

        private Picture GetPictureFromFormFile(IFormFile file) => throw new NotImplementedException();
        public PictureController(IPictureModificator modifier, IPictureRepository pictureRepository)
        {
            _modifier = modifier;
            _pictureRepository = pictureRepository;
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
            return  NotFound();
        }

        [HttpPatch("rotate/{id}")]
        public async Task<ActionResult<Guid>> Rotate(Guid id, float degrees) =>
            await ModifyPicture(id, pic => _modifier.Rotate(pic, degrees));

        [HttpPatch("text/{id}")]
        public async Task<ActionResult<Guid>> AddText(Guid id, string text) =>
            await ModifyPicture(id, pic => _modifier.AddText(pic, text));

        [HttpPatch("crop/{id}")]
        public async Task<ActionResult<Guid>> AddText(Guid id, [FromBody] CropRectangle rectangle) =>
            await ModifyPicture(id, pic => _modifier.Crop(pic, rectangle));

        [HttpPatch("blur/gaussian/{id}")]
        public async Task<ActionResult<Guid>> AddGaussianBlur(Guid id, int size) =>
            await ModifyPicture(id, pic => _modifier.AddGaussianBlur(pic, size));

        [HttpPatch("blur/circular/{id}")]
        public async Task<ActionResult<Guid>> AddCircularBlur(Guid id) =>
            await ModifyPicture(id, _modifier.AddCircularBlur);

        [HttpPatch("sepia/{id}")]
        public async Task<ActionResult<Guid>> AddSepiaFilter(Guid id) =>
            await ModifyPicture(id,  _modifier.AddSepiaFilter);

        [HttpPatch("black_and_white/{id}")]
        public async Task<ActionResult<Guid>> AddBnWFilter(Guid id) =>
            await ModifyPicture(id,  _modifier.AddBlackAndWhiteFilter);


        private async Task<ActionResult<Guid>> ModifyPicture(Guid id, Func<Picture, Picture> f)
        {
            var picture = await _pictureRepository.Get(id);
            if (picture == null)
                return NotFound();
            var modified = f(picture);
            return await _pictureRepository.Save(modified);
        }


    }


}