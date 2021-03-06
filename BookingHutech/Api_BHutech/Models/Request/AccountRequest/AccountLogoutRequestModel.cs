﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class AccountLogoutRequestModel
    {
        public String Account_ID { set; get; }

        public AccountLogoutRequestModel() { }

        public override string ToString()
        {
            return "AccountLogoutRequestModel with Account_id = " + this.Account_ID; 
        }
    }
}