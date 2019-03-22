using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.AccountModels; 

namespace BookingHutech.Api_BHutech.Models.Response.AccountResponse
{
    public class ManagerGetUnitResponseModel
    {
        public List<Unit> ListUnit { get; set;  }
    }
}