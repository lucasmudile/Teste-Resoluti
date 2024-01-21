using Application.Wrappers;
using Domain.Entities;
using Resoluti.Application.DTOs;

namespace Resoluti.Application.Interfaces.Services
{
    public interface IPersonService
    {
        Task<PagedResponse<List<PersonResponseDTO>>> SelectAll(DefaultQueryParameters defaultQuery);
        Task<Response<Guid>> RegisterAsync(PersonAddDTO savePerson);
        Task<Response<Guid>> UpdateAsync(PersonUpdateDTO updatePerson);
        Task<Response<bool>> RemoveAsync(Guid id);
        Task<Response<PersonResponseDTO>> GetById(Guid id);

    }
}
