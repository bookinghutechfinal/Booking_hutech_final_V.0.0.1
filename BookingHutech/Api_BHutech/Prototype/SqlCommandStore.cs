using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Prototype
{
    public static class SqlCommandStore
    {
        public const string ExcuteSpFail = "Execute store procedure {0} fail. ReturnCode: {1}[{2}].";
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
        // Get Rule Code By AccountID. Create By Anh.Trần Create 4/3/2019, update 10/3/2019
        public const string uspGetDetailRuleCodeByAccountID = "uspGetDetailRuleCodeByAccountID {0}";
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
        //Manager Get list repair cost. Create By Mr.Lam Create 11/3/2019. 
        public const string uspGetListRepairCost = "uspGetListRepairCost";
        //Manager Get List Driver By Driver Status. Create By Anh.Trần Create 10/3/2019. 
        public const string uspManagerGetListDriverByDriverStatus = "uspManagerGetListDriverByDriverStatus {0}";
        //Manager Get List Detail repair cost by RepairID. Create By Mr.Lam Create 13/3/2019. 
        public const string uspGetDetailRepairCost = "uspGetDetailRepairCost {0}";
        //Manager Get List cost by CostsTypeID. Create By Mr.Lam Create 13/3/2019. 
        public const string uspGetListCost = "uspGetListCost {0}";
        //Report cost by month. Create By Mr.Lam Create 14/3/2019. 
        public const string uspCostReport = "uspCostReport {0},{1}";
        //Manager Update Rroup Role. Create By Anh.Tran Create 15/3/2019. 
        public const string uspManagerUpdateRroupRole = "uspManagerUpdateRroupRole";
        //Manager Get Group Role. Create By Anh.Tran Create 17/3/2019. 
        public const string uspManagerGetGroupRole = "uspManagerGetGroupRole";
        //Manager Get Role Master By AccountID. Create By Anh.Tran Create 19/3/2019. // Lấy chi tiết những quyền chưa cấp cho account xxx. 
        public const string uspManagerGetRoleMasterByAccountID = "uspManagerGetRoleMasterByAccountID {0}";
        //Manager Update Role Master. Create By Anh.Tran Create 19/3/2019. // Cập nhật tên quyền và lấy ds quyền. 
        public const string uspManagerUpdateRoleMaster = "uspManagerUpdateRoleMaster";

    }

}