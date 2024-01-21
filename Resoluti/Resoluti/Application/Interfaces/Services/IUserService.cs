using Application.Wrappers;
using Domain.Entities;
using Resoluti.Application.DTOs;

namespace Resoluti.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<PagedResponse<List<User>>> SelectAll(DefaultQueryParameters defaultQuery);
        Task<Response<User>> RegisterAsync(UserAddDTO saveUser);
        Task<Response<User>> UpdateAsync(UserUpdateDTO updateUser);
        Task<Response<LoginResponseDTO>> Login(UserLogin login);
        Task<Response<User>> RemoveAsync(Guid id);
        Task<Response<User>> GetById(Guid id);

    }
}
