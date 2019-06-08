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
        public override string ToString()
        {
            return "ManagerUpdateRoleMasterRequestModel with RoleMaster_ID = " + this.RoleMaster_ID +
                "| UserNameUpdate = " + this.UserNameUpdate +
                "| RoleName = " + this.RoleName; 
        }
    }
}