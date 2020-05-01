using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class MainController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            return Ok();
        }
        
        [HttpGet]
        public async Task<IActionResult> DownloadFile()
        {
            return Ok();
        }
        
        [HttpPut]
        public async Task<IActionResult> ModifyFile()
        {
            return Ok();
        }
    }
}