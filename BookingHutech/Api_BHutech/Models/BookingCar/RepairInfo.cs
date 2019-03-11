using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.BookingCar
{
    public class RepairInfo : CostTypeInfo
    {
        public string RepairID { get; set; }
        public int Car_ID { get; set; }
        public string RepairAddres { get; set; }
        public string Note { get; set; }
        public string ImagerBill { get; set; }

        public RepairInfo() { }
    }
}