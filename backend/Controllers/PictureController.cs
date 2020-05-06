using System;
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

        private Picture GetPictureFromFormFile(IFormFile file) => throw new NotImplementedException();
        public PictureController(IPictureModificator modifier, IPictureRepository pictureRepository)
        {
            _modifier = modifier;
            _pictureRepository = pictureRepository;
        }
        [HttpPost]
        public async Task<ActionResult<Guid>> UploadFile(IFormFile file)
        {
            var picture = GetPictureFromFormFile(file);
            return await _pictureRepository.Save(picture);
        }
        
        [HttpGet]
        public async Task<ActionResult<Picture>> DownloadFile(Guid id)
        {
            var actionResult = await _pictureRepository.Get(id);
            if (actionResult != null)
                return actionResult;
            return  NotFound();
        }
        
        [HttpPost]
        public async Task<IActionResult> ModifyFile()
        {
            return Ok();
        }

    }
}