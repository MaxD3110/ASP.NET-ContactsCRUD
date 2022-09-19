using Domain;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class DBInitializer : IDBInitializer
    {
        private ApplicationDbContext _ctx;

        public DBInitializer(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public void Initialize()
        {
            if (_ctx.Database.GetPendingMigrations().Any())
            {
                _ctx.Database.Migrate();
            }

            if (!_ctx.Contacts.Any())
            {
                _ctx.Contacts.Add(new Contact
                {
                    Name = "Sample Name",
                    MobilePhone = "+375333428288",
                    JobTitle = "Sample Position",
                    BirthDate = "12.02.2000",
                });

                _ctx.SaveChangesAsync();
            }
        }
    }
}
