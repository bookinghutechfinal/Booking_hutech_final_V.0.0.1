using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class UpdateRegistrationCarStatusRequestModel
    {
        public String RegistrationCarID { get; set; }
        public int Profile_Status { get; set; }
        public int? DistanceTo { get; set; }
        public int? DistanceBack { get; set; }
        public int? CarID { get; set; }
    }
}