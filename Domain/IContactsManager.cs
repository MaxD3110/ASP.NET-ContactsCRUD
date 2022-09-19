using Domain.Models;

namespace Domain
{
    public interface IContactsManager
    {
        Task<int> CreateContact(Contact contact);

        Task<int> UpdateContact(Contact contact);

        Task<int> DeleteContact(int id);

        TResult GetContactById<TResult>(int id, Func<Contact, TResult> selector);

        IEnumerable<Contact> GetContacts();
    }
}
