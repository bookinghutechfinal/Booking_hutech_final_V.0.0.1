using BookingHutech.Api_BHutech.Lib.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class ManagerUpdateAccountRequestModel
    {
        public string Account_ID { get; set; }
        public string Password { get; set; }
        public string IsChangePassword { get; set; }
        public string Account_Status { get; set; }
        public string Verify { get; set; }
        public string AccountType { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public GroupRoleResponseType ReturnCode { get; set; }
        public ManagerUpdateAccountRequestModel() { }

        public override string ToString()
        {
            return "ManagerUpdateAccountRequestModel with Account_ID = " + this.Account_ID +
                "| Account_Status = " + this.Account_Status +
                "| AccountType = " + this.AccountType +
                "| ReturnCode = " + this.ReturnCode; 
        }
    }
}