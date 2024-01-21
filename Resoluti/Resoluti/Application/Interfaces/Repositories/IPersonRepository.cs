using Application.Wrappers;
using Domain.Entities;
using Resoluti.Application.DTOs;

namespace Resoluti.Application.Interfaces.Repositories
{
    public interface IPersonRepository : IGenericRepositoryAsync<Person>
    {

        Task<bool> SavePersonContact(List<ContactAddDTO> contactAddDTOs, Guid personId);
        Task<bool> SavePersonAdresses(List<AddressesAddDTO> addressesAddDTOs, Guid personId);
        Task<PagedResponse<List<PersonResponseDTO>>> SelectAllPersons(int pageNumber, int pageSize, string search);
        Task<PersonResponseDTO> SelectPersonById(Guid id);
        Task<bool> RemovePersonAdresses(Guid personId);
        Task<bool> RemovePersonContact(Guid personId);
    }
}
