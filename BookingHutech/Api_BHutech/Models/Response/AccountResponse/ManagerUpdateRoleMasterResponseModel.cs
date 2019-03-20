using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.AccountModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.AccountResponse
{
    public class ManagerUpdateRoleMasterResponseModel
    {
        public GroupRoleResponseType ReturnCode { get; set; }
        public List<RoleMaster> ListRoleMaster { get; set;  }
    }
}