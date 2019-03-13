using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class ManagerGetDriverByAccountStatusResponseModel
    {
        public List<AccountInfo> GetDriverInfo { get; set; }
        public List<GetRoleCode> GetRoleCode { get; set; }
    }
}