﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class DeleteRoleRequestModel
    {
        public string Account_ID { get; set; }
        public int RoleMaster_ID { get; set; }
        public int RoleDetail_Status { get; set; }
    }
}