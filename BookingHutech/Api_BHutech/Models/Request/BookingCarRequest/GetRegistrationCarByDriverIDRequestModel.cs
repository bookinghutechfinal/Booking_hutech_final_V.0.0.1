using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class GetRegistrationCarByDriverIDRequestModel
    {
        public string DriverID { get; set; }
        public int Profile_Status1 { get; set; }
        public int Profile_Status2 { get; set; }
        public int Profile_Status3 { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}