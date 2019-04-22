using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class UpdateDetailCostRequestModel : AddNewDetailCostRequestModel
    {
        public int RepairDetailID { get; set; }
    }
}