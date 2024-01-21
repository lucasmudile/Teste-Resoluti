using Application.Wrappers;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Resoluti.Application.DTOs;
using Resoluti.Application.Interfaces.Repositories;
using Resoluti.Infrastructure.Context;

namespace Resoluti.Infrastructure.Repositories
{
    public class UserRepository : GenericRepositoryAsync<User>, IUserRepository
    {
        private readonly DbSet<User> _user;
        public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _user = dbContext.Set<User>();
        }

        public async Task<User> Login(string email, string password)
        {
            var result = await _user.Where(p=>p.Email == email && p.Password==password)
                                    .FirstOrDefaultAsync();

            if (result != null)
            {
                return result;
            }

            return null;
        
        }



        public async Task<PagedResponse<List<User>>> SelectAllUsers(int pageNumber, int pageSize, string search)
        {
            var data = _user.AsQueryable();



            if (!string.IsNullOrEmpty(search))
                data = data.Where(p => p.UserName.Contains(search));

            var countItems = await data.CountAsync();

            var skip = (pageNumber - 1) * pageSize;
            data = data.Skip(skip).Take(pageSize);

            var response = data.Select(p => new User
            {
                Id = p.Id,
                UserName = p.UserName,
                Email = p.Email,
                Password = p.Password,
                Telephone=p.Telephone,
                Image= "https://localhost:44358/Photos/" + p.Image
            });

            var result = await response.ToListAsync();



            var totalpage = pageSize == 700 ? 1 : (int)Math.Ceiling(decimal.Divide(countItems, pageSize == 0 ? 1 : pageSize));

            return new PagedResponse<List<User>>(result, pageNumber, pageSize, totalpage, countItems);
        }











    }
}
