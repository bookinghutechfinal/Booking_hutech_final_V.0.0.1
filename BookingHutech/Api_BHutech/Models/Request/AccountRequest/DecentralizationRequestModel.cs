using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class AccountInfoRequest {
        public string AccountID { get; set;  }
        public string FullNameUpdate { get; set;  }
    }
    public class RoleRequest : AccountInfoRequest
    {
        public int RoleMaster_ID { get; set; }
    }
    public class DecentralizationRequestModel : RoleRequest
    {

        public List<AccountInfoRequest> AccountInfoRequest { get; set; }
        public List<RoleRequest> RoleRequest { get; set; }
    }
}