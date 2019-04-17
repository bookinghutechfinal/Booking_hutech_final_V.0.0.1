using BookingHutech.Api_BHutech.Lib.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.BookingCar
{
    public class AssignDriverInfo
    {
        public string Account_ID { get; set; }
        public int CarID { get; set; }
        public DateTime? CreateDate { get; set; }
        public string FullNameUpdate { get; set; }
        public int AssignStatus { get; set; }
        public string FullName { get; set; }
        public string CarNo { get; set; }
    }
}