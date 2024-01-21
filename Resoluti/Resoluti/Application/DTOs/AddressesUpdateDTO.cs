namespace Resoluti.Application.DTOs
{
    public class AddressesUpdateDTO
    {
        public Guid Id { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public string CEP { get; set; }
        public string Complemento { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
