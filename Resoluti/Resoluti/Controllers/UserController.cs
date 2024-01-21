using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Resoluti.Application.DTOs;
using Resoluti.Application.Interfaces.Services;

namespace Resoluti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _env;
        public UserController(IUserService userService, IWebHostEnvironment env)
        {

            _userService = userService;
            _env = env;
        }

        [AllowAnonymous]
        [HttpPost("authentication")]
        public async Task<IActionResult> Autentication(UserLogin userLogin)
        {
            return Ok(await _userService.Login(userLogin));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] DefaultQueryParameters defaultQuery)
        {
            return Ok(await _userService.SelectAll(defaultQuery));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            return Ok(await _userService.GetById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await _userService.RemoveAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> SaveUser(UserAddDTO request)
        {
            return Ok(await _userService.RegisterAsync(request));
        }

        
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdate)
        {
            return Ok(await _userService.UpdateAsync(userUpdate));
        }


        [HttpPost("SaveFile")]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);

            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
                return new JsonResult("sasuke-1.png");
            }
        }

    }
}
