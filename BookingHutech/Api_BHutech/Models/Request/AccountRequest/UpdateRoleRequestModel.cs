using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class UpdateRoleRequestModel
    {
        public string Account_ID { get; set; }
        public int RoleMaster_ID { get; set; }
        public Boolean RoleDetail_Status { get; set; }
        public string FullNameUpdate { get; set; }
    }
}