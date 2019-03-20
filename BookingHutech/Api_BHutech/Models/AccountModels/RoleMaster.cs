using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.AccountModels
{
    public class RoleMaster : GroupRole
    {
        public int RoleMaster_ID { get; set; }
        public int GroupRoleID { get; set; }
        public string RoleName { get; set; }
        public int RoleCode { get; set; }
        public bool Role_Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public String UserNameUpdate { get; set; }
    }
}