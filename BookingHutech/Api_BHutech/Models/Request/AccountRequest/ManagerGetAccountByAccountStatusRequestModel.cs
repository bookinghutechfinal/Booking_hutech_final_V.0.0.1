using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class ManagerGetAccountByAccountStatusRequestModel
    {
        public string  Account_Status { get; set; }
        public int Unit_ID { get; set; }
        public string AccountType { get; set; }

        public override string ToString()
        {
            return "ManagerGetAccountByAccountStatusRequestModel with  Account_Status = " + this.Account_Status +
                "| Unit_ID = " + this.Unit_ID +
                "| AccountType = " + this.AccountType; 
        }
    }
}