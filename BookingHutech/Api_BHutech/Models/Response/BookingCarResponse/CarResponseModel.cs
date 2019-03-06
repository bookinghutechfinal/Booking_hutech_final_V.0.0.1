using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class CarInfo : CarTypeInfo
    {
        public int CarID { get; set; }
        public String CarName { get; set; }
        public String CarNumber { get; set; }
        public int CarStatus { get; set; }
        public string CarImage { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public class CarResponseModel
        {
            public List<CarInfo> CarInfo { get; set; }
            public List<CarTypeInfo> CarTypeInfo { get; set; }
        }
    }
}