using Domain;
using Domain.Models;
using Mapster;

namespace Application
{
    [Service]
    public class CreateContact
    {
        private IContactsManager _contactsManager;

        public CreateContact(IContactsManager contactsManager)
        {
            _contactsManager = contactsManager;
        }

        public async Task<Contact> Do(Request request)
        {
            var newContact = request.Adapt<Contact>();

            await _contactsManager.CreateContact(newContact);

            return newContact;
        }

        public class Request : Contact { }
    }
}
