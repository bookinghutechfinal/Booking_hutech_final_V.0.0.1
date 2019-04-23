using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class ReportCostRequestModel
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public int ReportType { get; set; }
        public int YearQuarter { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}