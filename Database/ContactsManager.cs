using Domain;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class ContactsManager : IContactsManager
    {
        private ApplicationDbContext _ctx;

        public ContactsManager(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public Task<int> CreateContact(Contact contact)
        {
            _ctx.Contacts.Add(contact);

            return _ctx.SaveChangesAsync();
        }

        public Task<int> DeleteContact(int id)
        {
            var contactById = _ctx.Contacts.FirstOrDefault(x => x.Id == id);

            if (contactById == null)
                return Task.FromResult(0);

            _ctx.Contacts.Remove(contactById);

            return _ctx.SaveChangesAsync();
        }

        public TResult GetContactById<TResult>(int id, Func<Contact, TResult> selector)
        {
            return _ctx.Contacts
                .Where(p => p.Id == id)
                .Select(selector)
                .FirstOrDefault();
        }

        public IEnumerable<Contact> GetContacts()
        {
            return _ctx.Contacts;
        }

        public Task<int> UpdateContact(Contact contact)
        {
            _ctx.ChangeTracker.Clear();

            _ctx.Contacts.Update(contact);

            return _ctx.SaveChangesAsync();
        }
    }
}
