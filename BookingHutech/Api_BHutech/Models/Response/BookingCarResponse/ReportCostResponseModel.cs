using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class ReportCost
    {
        public string label { get; set; }
        public int value { get; set; }
    }

    public class ReportCostResponseModel
    {
        public List<ReportCost> ListReportCost { get; set; }
    }
}