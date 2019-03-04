using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.AccountResponse
{
    public class AccountInfoResponseModel
    {
        public string Account_ID { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }

        public DateTime Birthday { get; set; }
        public string Addres { get; set; }

        public DateTime CreateDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string Session { get; set; }
        public DateTime? SessionDate { get; set; }
        public bool? IsChangePassword { get; set; }
        public string Account_Status { get; set; }
        public bool? Verify { get; set; }
        public string AccountType { get; set; }
    }
    public class AccountLoginResponseModel
    {
        public List<AccountInfoResponseModel> GetAccountInfo { get; set; }
        public List<GetRoleCode> GetRoleCode { get; set; }
    }
    public class GetRoleCode
    {
        public int RoleCode { get; set; }

        public GetRoleCode() { }

    }

}