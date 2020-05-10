using System;
using System.IO;
using System.Threading.Tasks;
using backend.Data;
using backend.Services;
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

        private Picture GetPictureFromFormFile(IFormFile file)
        {
            var ms = new MemoryStream();
            file.CopyToAsync(ms);
            return new Picture(ms, file.FileName);
        }
        public PictureController(IPictureModificator modifier, IPictureRepository pictureRepository)
        {
            _modifier = modifier;
            _pictureRepository = pictureRepository;
        }
        [HttpPost]
        public async Task<ActionResult<string>> UploadFile(IFormFile file)
        {
            var picture = GetPictureFromFormFile(file);
            return await _pictureRepository.Save(picture);
        }
        
        [HttpGet]
        public async Task<ActionResult<Picture>> DownloadFile(string id)
        {
            var actionResult = await _pictureRepository.Get(id);
            if (actionResult != null)
                return actionResult;
            return NotFound();
        }
        
        [HttpPost]
        public async Task<IActionResult> ModifyFile()
        {
            return Ok();
        }

    }
}