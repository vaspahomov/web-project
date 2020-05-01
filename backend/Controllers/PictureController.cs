using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            return Ok(file.FileName);
        }
        
        [HttpGet]
        public async Task<IActionResult> DownloadFile()
        {
            return Ok("Some");
        }
        
        [HttpPut]
        public async Task<IActionResult> ModifyFile()
        {
            return Ok();
        }
    }
}