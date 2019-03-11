using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.BookingCar
{
    public class CostTypeInfo
    {
        public int CostTypeID { get; set; }
        public string CostsTypeName { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public string FullNameUpdate { get; set; }

        public CostTypeInfo() { }
    }
}