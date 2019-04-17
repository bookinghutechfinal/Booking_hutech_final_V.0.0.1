using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class UpdateRepairStatusRequestModel
    {
        public string RepairID { get; set; }
        public int RepairStatus { get; set; }
        public string FullNameUpdate { get; set; }
    }
}