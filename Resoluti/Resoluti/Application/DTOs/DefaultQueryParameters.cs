using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace Resoluti.Application.DTOs
{
    public class DefaultQueryParameters
    {
        public DefaultQueryParameters()
        {
            PageNumber = 1;
            PageSize = 700;
        }

        public DefaultQueryParameters(int pageNumber, int pageSize, string search)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            Search = search;
        }


        [FromQuery(Name = "pageNumber")]
        [DisplayName("pageNumber")]
        public int PageNumber { get; set; }

        [FromQuery(Name = "pageSize")]
        [DisplayName("pageSize")]
        public int PageSize { get; set; }


        [FromQuery(Name = "search")]
        [DisplayName("search")]
        public string ?Search { get; set; }
    }
}
