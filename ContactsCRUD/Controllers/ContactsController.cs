using Application;
using Microsoft.AspNetCore.Mvc;

namespace ContactsCRUD.Controllers
{
    [Route("[controller]")]
    public class ContactsController : Controller
    {
        [HttpGet("")]
        public IActionResult GetContacts([FromServices] GetContacts getContacts) => Ok(getContacts.Do());

        [HttpGet("{id}")]
        public IActionResult GetContactsById(int id,
            [FromServices] GetContactById getContactById) => Ok(getContactById.Do(id));

        [HttpPost("")]
        public async Task<IActionResult> CreateContact([FromForm] CreateContact.Request request,
            [FromServices] CreateContact createContact) => Ok(await createContact.Do(request));

        [HttpPut("")]
        public async Task<IActionResult> UpdateContact([FromForm] UpdateContact.Request request,
           [FromServices] UpdateContact updateContact) => Ok(await updateContact.Do(request));

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id,
           [FromServices] DeleteContact deleteContact) => Ok(await deleteContact.Do(id));
    }
}
