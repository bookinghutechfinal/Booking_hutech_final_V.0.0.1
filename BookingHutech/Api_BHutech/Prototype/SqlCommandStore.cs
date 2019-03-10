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
        // Get Account Info By Account_ID. Create By Anh.Trần Create 4/3/2019 
        public const string uspGetAccountInfoByAccountID = "uspGetAccountInfoByAccountID";
        // Get Rule Code By AccountID. Create By Anh.Trần Create 4/3/2019 
        public const string uspGetRuleCodeByAccountID = "uspGetRuleCodeByAccountID {0}";
        // Get List car. Create By Lam Create 5/3/2019. 
        public const string uspGetListCar = "uspGetListCar {0},{1}";
        // Get List cartype. Create By Lam Create 5/3/2019. 
        public const string uspGetListCarType = "uspGetListCarType";
        // Get List car by cartypeID. Create By Lam Create 5/3/2019. 
        public const string uspGetListCarByCarTypeID = "uspGetListCarByCarTypeID {0},{1},{2}";
        // Manager Get Account By Account_Status. Create By Anh.Trần Create 10/3/2019. 
        public const string uspManagerGetAccountByAccountStatus = "uspManagerGetAccountByAccountStatus {0}";
        //Manager Get Detail Account By AccountID. Create By Anh.Trần Create 10/3/2019. 
        public const string uspManagerGetDetailAccountByAccountID = "uspManagerGetDetailAccountByAccountID {0}";
        
    }

}