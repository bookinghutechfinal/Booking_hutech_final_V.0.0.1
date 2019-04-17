using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class AssignDriverManagerRequestModel
    {
        public string Account_ID { get; set; }
        public int CarID { get; set; }
        public string FullNameUpdate { get; set; }

    }
}