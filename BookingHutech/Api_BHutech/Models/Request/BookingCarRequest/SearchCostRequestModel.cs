using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class SearchCostRequestModel
    {
        public int CarID { get; set; }
        public DateTime? Date_to { get; set; }
        public DateTime? Date_from { get; set; }
        public int CostsTypeID { get; set; }
    }
}