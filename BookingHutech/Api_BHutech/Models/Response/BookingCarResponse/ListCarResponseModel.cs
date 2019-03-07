using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response
{
    /// <summary>
    ///
    /// </summary>
    public class ListCarResponseModel : CarInfo
    {
        public List<CarInfo> ListCar { get; set;  }
        public List<CarTypeInfo> ListCarType { get; set; }
    }
    
}