using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response
{
    public class GetListAssignDriverRequestModel
    {
        public List<AssignDriverInfo> GetListAssignDriver { get; set; }
        public List<AssignDriverInfo> ListAssigned { get; set; }
    }
}