using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Resoluti.Infrastructure.Context
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public ApplicationDbContext()
        {
        }

        public DbSet<Person> Person { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Address> Address { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User 
                { 
                            Id = Guid.Parse("0346D140-5D42-47DC-809F-CF7EF16D18B6"), 
                            UserName = "Admin",
                            Email="admin@gmail.com",
                            Password="123",
                            Telephone="244938992431",
                            Image= "sasuke-1.png"
                },
                new User
                {
                    Id = Guid.Parse("0346D140-5D42-47DC-809F-CF7EF16D1876"),
                    UserName = "Lucas",
                    Email = "lucas@gmail.com",
                    Password = "123",
                    Telephone = "244938992431",
                    Image = "sasuke-1.png"
                }
            );
        }

    }
}
