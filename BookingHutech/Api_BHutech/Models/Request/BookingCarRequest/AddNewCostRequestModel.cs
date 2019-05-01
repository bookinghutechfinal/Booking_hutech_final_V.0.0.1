using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class AddNewCostRequestModel : RepairDetailInfo
    {
        public int AddType { get; set; }
    }

    public class NewDetailCostRequestModel
    {
        public string RepairID { get; set; }
        public string Content { get; set; }
        public int? Quantity { get; set; }
        public decimal TotalMoney { get; set; }
    }

    public class NewCostRequestModel
    {
        public AddNewCostRequestModel newCost { get; set; }
        public List<AddNewDetailCostRequestModel> newDetailCost { get; set; }
    }
}