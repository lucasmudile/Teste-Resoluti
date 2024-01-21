using AutoMapper;
using Domain.Entities;
using Resoluti.Application.DTOs;

namespace Resoluti.Application.Mapping
{
    public class GeneralProfile : Profile
    {

        public GeneralProfile()
        {


            CreateMap<User, UserAddDTO>().ReverseMap();
            CreateMap<User, UserUpdateDTO>().ReverseMap();
            CreateMap<PersonAddDTO, Person>().ReverseMap();
            CreateMap<AddressesAddDTO, Address>().ReverseMap();
            CreateMap<ContactAddDTO, Contact>().ReverseMap();


        }

    }
}
