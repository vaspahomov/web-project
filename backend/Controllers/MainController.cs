using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class MainController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> UploadFile()
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