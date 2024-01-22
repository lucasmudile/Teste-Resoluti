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
    public class PersonController : ControllerBase
    {

        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {

            _personService = personService;
     
        }


        [HttpGet]
        public async Task<IActionResult> GetAllPeople([FromQuery] DefaultQueryParameters defaultQuery)
        {
            return Ok(await _personService.SelectAll(defaultQuery));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _personService.GetById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await _personService.RemoveAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> SavePerson(PersonAddDTO personAdd)
        {
            return Ok(await _personService.RegisterAsync(personAdd));
        }


        [HttpPut]
        public async Task<IActionResult> UpdatePerson(PersonUpdateDTO personUpdate)
        {
            return Ok(await _personService.UpdateAsync(personUpdate));
        }


  
    }
}
