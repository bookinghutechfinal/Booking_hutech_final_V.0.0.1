using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.BookingCar; 

namespace BookingHutech.Api_BHutech.Models.BookingCar
{
    public class CarInfo : CarTypeInfo
    {
        public int CarID { get; set; }
        public String CarName { get; set; }
        public String CarNo { get; set; }
        public int CarStatus { get; set; }
        public string CarImage { get; set; }
        public string CarImageNew { get; set; }
        public DateTime? Expires { get; set; }
        public DateTime? InsuranceExpires { get; set; }
        public String DriverID { get; set; } // Anh update 18/4/2019 Thông tin lái xe hiện tại của xe
        public String FullNameDriver { get; set; } // Anh update 18/4/2019 Thông tin lái xe hiện tại của xe


        public CarInfo() { }

    }
}