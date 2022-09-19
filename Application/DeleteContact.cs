using Domain;

namespace Application
{
    [Service]
    public class DeleteContact
    {
        private IContactsManager _contactsManager;

        public DeleteContact(IContactsManager contactsManager)
        {
            _contactsManager = contactsManager;
        }


        public Task<int> Do(int id)
        {
            return _contactsManager.DeleteContact(id);
        }
    }
}
