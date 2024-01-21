namespace Resoluti.Application.DTOs
{
    public class UserUpdateDTO
    {
        public Guid Id  { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}
