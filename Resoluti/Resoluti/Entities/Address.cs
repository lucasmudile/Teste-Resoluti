using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Address
    {
        [Key]
        public Guid Id { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public string CEP { get; set; }
        public string Complemento { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Person Person { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Guid PersonId { get; set; }

    }
}
