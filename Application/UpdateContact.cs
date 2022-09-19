using Domain;
using Domain.Models;
using Mapster;

namespace Application
{
    [Service]
    public class UpdateContact
    {
        private IContactsManager _contactsManager;

        public UpdateContact(IContactsManager contactsManager)
        {
            _contactsManager = contactsManager;
        }


        public async Task<Contact> Do(Request request)
        {
            var contact = _contactsManager.GetContactById(request.Id, p => p);

            var newContact = request.Adapt<Contact>();

            contact = newContact;

            await _contactsManager.UpdateContact(contact);

            return contact;
        }

        public class Request : Contact { }
    }
}
