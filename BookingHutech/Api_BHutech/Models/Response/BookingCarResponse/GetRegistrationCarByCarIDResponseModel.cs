using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class GetRegistrationCarByCarID : RegistrationCarInfo
    {
        public String CarNo { get; set; }
        public string FullName { get; set; }
    }

    public class GetRegistrationCarByCarIDResponseModel
    {
        public List<GetRegistrationCarByCarID> GetRegistrationCarByCarID { get; set; }
    }
}