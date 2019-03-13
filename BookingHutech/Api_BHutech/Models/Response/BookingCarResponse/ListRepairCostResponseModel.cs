using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.BookingCar;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class ListRepairCost : RepairDetailInfo
    {

        public String CarNo { get; set; }
        public int CarStatus { get; set; }
        public string CarImage { get; set; }

    }

    public class ListRepairCostResponseModel
    {

        public List<ListRepairCost> ListRepairCost { get; set;}
    }
}