using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class GetListCostRequestModel
    {
        public int CostsTypeID { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int CarID { get; set; }
        public int RepairStatus { get; set; }
        public int RepairStatus1 { get; set; }
        public int Limit { get; set; }
        public GetListCostRequestModel() { }
    }
}