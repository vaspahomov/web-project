using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data.Entities;
using backend.Helpers;
using backend.Models;
using backend.Models.User;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private IUserService _userService;
        private readonly ILogger<AuthController> _logger;
        private readonly AppSettings _appSettings;

        public AuthController(
            IUserService userService,
            IOptions<AppSettings> appSettings,
            ILogger<AuthController> logger)
        {
            _userService = userService;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateModel model)
        {
            var user = await _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new {message = "Username or password is incorrect"});

            _logger.LogInformation($"Authenticated user {user}");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddMonths(1)
            };

            Response.Cookies.Append("user_token", tokenString, cookieOptions);
            return Ok(new
            {
                Token = tokenString
            });
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = new UserModel(model.Username);

            try
            {
                var userEntity = await _userService.Create(user, model.Password);
                _logger.LogInformation($"Created user {userEntity}");

                return Ok(userEntity.Id);
            }
            catch (AppException ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
    }
}