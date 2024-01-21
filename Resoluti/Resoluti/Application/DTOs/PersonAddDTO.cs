namespace Resoluti.Application.DTOs
{
    public class PersonAddDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public List<AddressesAddDTO> Addresses { get; set; }
        public List<ContactAddDTO> Contacts { get; set; }
        public Guid UserId { get; set; }
    }
}
