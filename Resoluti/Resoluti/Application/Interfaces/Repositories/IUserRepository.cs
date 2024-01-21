using Application.Wrappers;
using Domain.Entities;

namespace Resoluti.Application.Interfaces.Repositories
{
    public interface IUserRepository:IGenericRepositoryAsync<User>
    {
        Task<User> Login(string email, string password);
        Task<PagedResponse<List<User>>> SelectAllUsers(int pageNumber, int pageSize, string search);
    }
}
