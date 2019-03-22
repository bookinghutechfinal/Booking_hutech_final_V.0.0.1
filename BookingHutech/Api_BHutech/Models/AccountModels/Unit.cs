using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.AccountModels
{
    public class Unit
    {
        public int Unit_ID { get; set; }
        public string UnitName { get; set; }
        public string UnitManager { get; set; }
        public string EmailManage { get; set; }
        public string NumberPhoneManager { get; set; }

        public Unit(){}
    }
}