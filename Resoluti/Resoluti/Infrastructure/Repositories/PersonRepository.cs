using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Resoluti.Application.DTOs;
using Resoluti.Application.Interfaces.Repositories;
using Resoluti.Infrastructure.Context;

namespace Resoluti.Infrastructure.Repositories
{
    public class PersonRepository : GenericRepositoryAsync<Person>, IPersonRepository
    {
        private readonly DbSet<Person> _people;
        private readonly DbSet<Contact> _contacts;
        private readonly DbSet<Address> _address;
        private readonly IMapper _mapper;
        public PersonRepository(ApplicationDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _people = dbContext.Set<Person>();
            _contacts = dbContext.Set<Contact>();
            _address = dbContext.Set<Address>();
            _mapper = mapper;

        }


        public async Task<PagedResponse<List<PersonResponseDTO>>> SelectAllPersons(int pageNumber, int pageSize, string search)
        {
            var people = _people.Include(p => p.Adresses)
                                .Include(p => p.Contacts)
                                .Include(p => p.User)
                                .AsQueryable();



            if (!string.IsNullOrEmpty(search))
                people = people.Where(p => p.Name.Contains(search));

            var countItems = await people.CountAsync();

            var skip = (pageNumber - 1) * pageSize;
            people = people.Skip(skip).Take(pageSize);


            var result = await people.Select(p => new PersonResponseDTO
            {
                Id = p.Id,
                Name = p.Name,
                Surname = p.Surname,
                Email = p.Email,
                CPF = p.CPF,
                RG = p.RG,
                BirthDate = p.BirthDate,
                Addresses = p.Adresses != null ? p.Adresses.Select(x => new AddressesDTOResponse
                {
                    CEP = x.CEP,
                    City = x.City,
                    Complemento = x.Complemento,
                    Number = x.Number,
                    Street = x.Street,
                    State = x.State,
                }).ToList() : null,

                Contacts = p.Contacts != null ? p.Contacts.Select(y => new ContactDTOResponse
                {
                    Name = y.Name,
                    ContactNumber = y.ContactNumber,
                    Type = y.Type
                }).ToList() : null,
                UserName=p.User.UserName

            }).ToListAsync();



            var totalpage = pageSize == 700 ? 1 : (int)Math.Ceiling(decimal.Divide(countItems, pageSize == 0 ? 1 : pageSize));

            return new PagedResponse<List<PersonResponseDTO>>(result, pageNumber, pageSize, totalpage, countItems);
        }



        public async Task<PersonResponseDTO> SelectPersonById(Guid id)
        {
            var people = _people.Include(p => p.Adresses)
                                .Include(p => p.Contacts)
                                .AsQueryable();

            var result = await people.Where(x => x.Id == id).Select(p => new PersonResponseDTO
            {
                Id = p.Id,
                Name = p.Name,
                Surname = p.Surname,
                Email = p.Email,
                CPF = p.CPF,
                RG = p.RG,
                BirthDate = p.BirthDate,
                Addresses = p.Adresses != null ? p.Adresses.Select(x => new AddressesDTOResponse
                {
                    CEP = x.CEP,
                    City = x.City,
                    Complemento = x.Complemento,
                    Number = x.Number,
                    Street = x.Street,
                    State = x.State,
                }).ToList() : null,

                Contacts = p.Contacts != null ? p.Contacts.Select(y => new ContactDTOResponse
                {
                    Name = y.Name,
                    ContactNumber = y.ContactNumber,
                    Type = y.Type
                }).ToList() : null


            }).FirstOrDefaultAsync();




            return result;
        }


        public async Task<bool> SavePersonContact(List<ContactAddDTO> contactAddDTOs, Guid personId)
        {
            foreach (var contact in contactAddDTOs)
            {
                var contat = _mapper.Map<Contact>(contact);
                contat.Id = Guid.NewGuid();
                contat.PersonId = personId;
                await _contacts.AddAsync(contat);
            }

            await _dbContext.SaveChangesAsync();
            return true;
        }


        public async Task<bool> SavePersonAdresses(List<AddressesAddDTO> addressesAddDTOs, Guid personId)
        {
            foreach (var addressDTO in addressesAddDTOs)
            {
                var address = _mapper.Map<Address>(addressDTO);
                address.Id = Guid.NewGuid();
                address.PersonId = personId;
                await _address.AddAsync(address);
            }

            await _dbContext.SaveChangesAsync();
            return true;
        }



        public async Task<bool> RemovePersonContact(Guid personId)
        {
            var contacts = _contacts.Where(p => p.PersonId == personId).AsQueryable();

            _contacts.RemoveRange(contacts);
            await _dbContext.SaveChangesAsync();
            return true;
        }


        public async Task<bool> RemovePersonAdresses(Guid personId)
        {
            var contacts = _address.Where(p => p.PersonId == personId).AsQueryable();

            _address.RemoveRange(contacts);
            await _dbContext.SaveChangesAsync();
            return true;
        }



    }
}
