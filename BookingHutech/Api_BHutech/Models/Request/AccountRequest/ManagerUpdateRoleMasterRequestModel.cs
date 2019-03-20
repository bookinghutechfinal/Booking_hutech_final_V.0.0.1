using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class ManagerUpdateRoleMasterRequestModel
    {
        public int RoleMaster_ID { get; set; }
        public string UserNameUpdate { get; set; }
        public string RoleName { get; set; } 
    }
}