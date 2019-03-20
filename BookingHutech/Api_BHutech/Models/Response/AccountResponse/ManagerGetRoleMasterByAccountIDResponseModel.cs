using BookingHutech.Api_BHutech.Models.AccountModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.AccountResponse
{
    public class ManagerGetRoleMasterByAccountIDResponseModel
    {
        public List<RoleMaster> RoleMasterByAccountID { get; set; }
    }
}