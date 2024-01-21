namespace Resoluti.Application.DTOs
{
    public class PersonResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }

        public List<AddressesDTOResponse> Addresses { get; set; }
        public List<ContactDTOResponse> Contacts { get; set; }

        public string UserName { get; set; }
    }
}
