using Demo.Api_BHutech.Models.Response;
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
    public class ListCarResponseModel : Car
    {
        //public int CarID { get; set; }
        //public String CarName { get; set; }
        //public String CarNumber { get; set; }
        //public int CarTypeID { get; set; }
        //public int CarStatus { get; set; } 

        // danh sách xe trả về.
        public List<ListCarResponseModel> listCar { get; set;  }
    }
    
}