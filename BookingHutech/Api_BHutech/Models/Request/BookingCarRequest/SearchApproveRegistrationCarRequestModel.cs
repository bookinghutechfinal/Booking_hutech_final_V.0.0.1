using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class SearchApproveRegistrationCarRequestModel
    {
        public DateTime? DateTimeFrom { get; set; }
        public DateTime? DateTimeTo { get; set; }

        public override string ToString()
        {
            return "SearchApproveRegistrationCarRequestModel with DateTimeFrom = " + this.DateTimeFrom + " | DateTimeTo = " + this.DateTimeTo; 
        }
    }
}