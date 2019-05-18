using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class GetReportDetailCarRequestModel
    {
        public int CarID { get; set; }
        public int Profile_Status { get; set; }
        public int RepairStatus { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}