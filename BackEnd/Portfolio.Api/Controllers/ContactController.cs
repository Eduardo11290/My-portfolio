using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Security;
using Portfolio.BusinessLogic.DTOs.Contact;
using Portfolio.BusinessLogic.Services.Interfaces;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController(IContactService contactService) : ControllerBase
    {
        /// <summary>Public — submit a contact message.</summary>
        [HttpPost]
        public async Task<ActionResult<ContactGetDTO>> Send(ContactCreateDTO dto)
        {
            try
            {
                var created = await contactService.AddAsync(dto);
                return Ok(created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Admin — list all received messages, newest first.</summary>
        [HttpGet]
        [ApiKey]
        public async Task<ActionResult<List<ContactGetDTO>>> GetAll()
        {
            try
            {
                var messages = await contactService.GetAllAsync();
                return Ok(messages);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
