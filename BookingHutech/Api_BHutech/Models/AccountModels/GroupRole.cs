using BookingHutech.Api_BHutech.Lib.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.AccountModels
{ 
    public class GroupRole
    { 
        public int GroupRoleID {get;set;} 
        public string GroupRoleName { get;set;}
        public GroupRoleResponseType ReturnCode { get; set; }

    }
}