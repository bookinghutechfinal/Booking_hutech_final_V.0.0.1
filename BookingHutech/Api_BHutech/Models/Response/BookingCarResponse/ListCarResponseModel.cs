using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response
{
    /// <summary>
    /// anh.tran 
    /// Create 23/2/2019
    /// </summary>
    public class ListCarResponseModel : CarInfo
    {
        public List<ListCarResponseModel> listCar { get; set;  }
    }
    
}