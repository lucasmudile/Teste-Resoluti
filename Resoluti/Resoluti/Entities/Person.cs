using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Person
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email  { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public IList<Address> ?Adresses { get; set; }
        public IList<Contact> ?Contacts { get; set; }
        public User User { get; set; }
        [ForeignKey(nameof(UserId))]
        public Guid UserId { get; set; }
        

    }
}
