using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response
{
    public class CheckPermissionResponseModel
    {
        public List<AccountInfoResponseModel> GetAccountInfo { get; set; }
        public List<GetRoleCode> GetRoleCode { get; set; }
    }
}