using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class GetListCostByAccountCreateRequestModel
    {
        public string AccountCreate { get; set; }
        public int RepairStatus1 { get; set; }
        public int RepairStatus2 { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}