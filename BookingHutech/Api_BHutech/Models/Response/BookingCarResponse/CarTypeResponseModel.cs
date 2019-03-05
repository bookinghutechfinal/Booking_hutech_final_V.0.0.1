using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class CarTypeInfo
    {
        public int CarTypeID { get; set; }
        public string CarTypeName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string Account_ID { get; set; }
    }

    public class CarTypeResponseModel
    {
        public List<CarTypeInfo> CarInfo { get; set; }
    }
}