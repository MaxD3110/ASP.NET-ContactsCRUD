using Domain;
using Domain.Models;

namespace Application
{
    [Service]
    public class GetContactById
    {
        private IContactsManager _contactsManager;

        public GetContactById(IContactsManager contactsManager)
        {
            _contactsManager = contactsManager;
        }

        public Contact Do(int id)
        {
            return _contactsManager.GetContactById(id, p => p);
        }
    }
}
