using Domain;
using Domain.Models;

namespace Application
{
    [Service]
    public class GetContacts
    {
        private IContactsManager _contactsManager;

        public GetContacts(IContactsManager contactsManager)
        {
            _contactsManager = contactsManager;
        }

        public IEnumerable<Contact> Do() => _contactsManager.GetContacts();
    }
}
