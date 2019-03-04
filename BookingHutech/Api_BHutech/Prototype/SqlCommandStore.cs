using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Prototype
{
    public static class SqlCommandStore
    {
        // Get list car by Car Status. Anh.Tran Create 23/2/2018. 
        public const string uspGetListCarByCarStatus = "uspGetListCarByCarStatus";
        // Login . Create By Lam Create 28/2/2018. 
        public const string uspAccountLogin = "uspAccountLogin";
        // Logout. Create By Lam Create 28/2/2018. 
        public const string uspAccountLogout = "uspAccountLogout";
        // Get GuleCode in Login. Create By Lam Create 28/2/2018. 
        public const string uspGetRuleCodeByAccount = "uspGetRuleCodeByAccount";
    }

}