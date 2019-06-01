using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.AccountModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    
    public class UpdateGroupRoleRequestModel : GroupRole
    {
        //public UpdateGroupRoleRequestModel() { }
        public override string ToString()
        {
            return "UpdateGroupRoleRequestModel with  GroupRoleID= " + this.GroupRoleID +
                "| GroupRoleName = " + this.GroupRoleName +
                "| ReturnCode = " + this.ReturnCode; 

        }
    }
}