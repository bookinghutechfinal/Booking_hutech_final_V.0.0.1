using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class AddNewDetailCostRequestModel
    {
        public string RepairID { get; set; }
        public string Content { get; set; }
        public int? Quantity { get; set; }
        public decimal TotalMoney { get; set; }
    }
}