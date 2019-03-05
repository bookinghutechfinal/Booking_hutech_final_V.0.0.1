using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Prototype
{
    public static class SqlCommandStore
    {
        // Get list car by Car Status. Anh.Tran Create 23/2/2019. 
        public const string uspGetListCarByCarStatus = "uspGetListCarByCarStatus";
        // Login . Create By Lam Create 28/2/2019. 
        public const string uspAccountLogin = "uspAccountLogin";
        // Logout. Create By Lam Create 28/2/2019. 
        public const string uspAccountLogout = "uspAccountLogout";
        // Get GuleCode in Login. Create By Lam Create 28/2/2019. 
        public const string uspGetRuleCodeByAccount = "uspGetRuleCodeByAccount";
        // Get List car. Create By Lam Create 5/3/2019. 
        public const string uspGetListCar = "uspGetListCar {0},{1}";
        // Get List cartype. Create By Lam Create 5/3/2019. 
        public const string uspGetListCarType = "uspGetListCarType";
       
    }

}