using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class AccountChangePasswordRequestModel
    {
        public string Account_ID { get; set; }
        public string Password { get; set; }

        public AccountChangePasswordRequestModel() {}
    }
}