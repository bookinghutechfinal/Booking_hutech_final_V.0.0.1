using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.AccountResponse
{
    public class ManagerGetDetailAccountByAccountIDResponseModel
    { 
        public List<AccountInfo> GetAccountInfo { get; set; }
        public List<GetRoleCode> GetRoleCode { get; set; } 
    }
}