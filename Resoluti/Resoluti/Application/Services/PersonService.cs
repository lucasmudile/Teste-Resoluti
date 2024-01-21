using Application.Exceptions;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using Resoluti.Application.DTOs;
using Resoluti.Application.Interfaces.Repositories;
using Resoluti.Application.Interfaces.Services;
using Resoluti.Infrastructure.Repositories;

namespace Resoluti.Application.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _personRepository;
        private readonly IMapper _mapper;

        public PersonService(IPersonRepository personRepository, IMapper mapper)
        {
            _personRepository = personRepository;
            _mapper = mapper;
        }

        public async Task<Response<PersonResponseDTO>> GetById(Guid id)
        {
            try
            {
                var people = await _personRepository.SelectPersonById(id);
                return new Response<PersonResponseDTO>(people, "Pessoa registada");
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }


        public async Task<Response<Guid>> RegisterAsync(PersonAddDTO savePerson)
        {
            try
            {
                var person = _mapper.Map<Person>(savePerson);
                person.Id = Guid.NewGuid();
                var result = await _personRepository.AddAsync(person);

                if (savePerson.Contacts.Count > 0)
                    await _personRepository.SavePersonContact(savePerson.Contacts, person.Id);

                if (savePerson.Addresses.Count > 0)
                    await _personRepository.SavePersonAdresses(savePerson.Addresses, person.Id);

                return new Response<Guid>(person.Id, Constantes.Constantes.RegistoSalvo);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }

        public async Task<Response<bool>> RemoveAsync(Guid id)
        {
            try
            {
                var person = await _personRepository.GetByGUIDAsync(id);

                if (person != null)
                {
                    await _personRepository.DeleteAsync(person);
                    return new Response<bool>(true, Constantes.Constantes.RegistoEliminado);

                }
                return new Response<bool>(false, Constantes.Constantes.RegistoNaoEncontradoEliminar);

            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }

        public async Task<PagedResponse<List<PersonResponseDTO>>> SelectAll(DefaultQueryParameters defaultQuery)
        {

            try
            {
                return await _personRepository.SelectAllPersons(defaultQuery.PageNumber,defaultQuery.PageSize,defaultQuery.Search);

            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }

        }

        public async Task<Response<Guid>> UpdateAsync(PersonUpdateDTO updatePerson)
        {

            try
            {
                var person = await _personRepository.GetByGUIDAsync(updatePerson.Id);

                if (person != null)
                {

                   person.Name = updatePerson.Name;
                   person.Surname = updatePerson.Surname;
                   person.Email = updatePerson.Email;
                   person.RG = updatePerson.RG;
                   person.BirthDate = updatePerson.BirthDate;
                   person.CPF = updatePerson.CPF;
                   
                    await _personRepository.UpdateAsync(person);

                    //Remove All contacts and Addresses
                    await _personRepository.RemovePersonAdresses(person.Id);
                    await _personRepository.RemovePersonContact(person.Id);


                    //Insert contacts 
                    if (updatePerson.Contacts.Count > 0)
                        await _personRepository.SavePersonContact(updatePerson.Contacts, person.Id);

                    //Insert Addresses
                    if (updatePerson.Addresses.Count > 0)
                        await _personRepository.SavePersonAdresses(updatePerson.Addresses, person.Id);

                    return new Response<Guid>(person.Id, Constantes.Constantes.RegistoSalvo);


                }
                return new Response<Guid>(updatePerson.Id, Constantes.Constantes.RegistoNaoEncontradoActualizado);

            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }
    }
}
