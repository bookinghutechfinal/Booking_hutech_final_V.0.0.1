﻿using System;
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
        //Manager Get List Driver By Driver Status. Create By Anh.Trần Create 10/3/2019. 
        public const string uspManagerGetListDriverByDriverStatus = "uspManagerGetListDriverByDriverStatus {0}";
        //Manager Get List Detail repair cost by RepairID. Create By Mr.Lam Create 13/3/2019. 
        public const string uspGetDetailRepairCost = "uspGetDetailRepairCost {0}";
        //Manager Get List cost by CostsTypeID. Create By Mr.Lam Create 13/3/2019. 
        public const string uspGetListCost = "uspGetListCost {0},'{1}','{2}',{3},{4},{5},{6}";
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
        //Manager Get Unit. Create By Anh.Tran Create 22/3/2019. // Xem danh sách khoa/viện/đơn vị. 
        public const string uspManagerGetUnit = "uspManagerGetUnit";
        //Manager Get Unit. Create By Anh.Tran Create 22/3/2019. 
        public const string uspCreateNewAccount = "uspCreateNewAccount";
        //Manager Get Role Master. Create By Anh.Tran Create 24/3/2019. 
        public const string uspManagerGetRoleMaster = "uspManagerGetRoleMaster";
        //Manager Get Account By Account Status Account Type. Create By Anh.Tran Create 24/3/2019. 
        public const string uspManagerGetAccountByAccountStatusAccountType = "uspManagerGetAccountByAccountStatusAccountType";
        //Manager Get Role Master. Create By Mr.Lam Create 27/3/2019. 
        public const string uspGetCarInfo = "uspGetCarInfo {0}";
        //Update CarStatus. Create By Mr.Lam Create 28/3/2019. 
        public const string uspUpdateCarStatus = "uspUpdateCarStatus";
        //Get RegristrationCar by CarID. Create By Mr.Lam Create 28/3/2019. 
        public const string uspGetRegistrationCarByCarID = "uspGetRegistrationCarByCarID {0},{1}";
        //Update CarStatus. Create By Mr.Lam Create 28/3/2019. 
        public const string uspGetListCostByCarID = "uspGetListCostByCarID {0}";
        //Get car info by AccountID and AssignStatus. Create By Mr.Lam Create 8/4/2019. 
        public const string uspGetCarInfoByAccountID = "uspGetCarInfoByAccountID {0},{1}";
        //Get car info by AccountID and AssignStatus. Create By Mr.Lam Create 8/4/2019. 
        public const string uspGetListCostByAccountCreate = "uspGetListCostByAccountCreate {0},{1},{2},{3},{4}";
        //Get RegristrationCar by DriverID. Create By Mr.Lam Create 9/4/2019. 
        public const string uspGetRegistrationCarByDriverID = "uspGetRegistrationCarByDriverID {0},{1},{2},{3},{4},{5}";
        //Get UpdateRegistrationCar Status by RegistrationID. Create By Mr.Lam Create 12/4/2019. 
        public const string uspUpdateRegistrationCarStatus = "uspUpdateRegistrationCarStatus";
        //Update Edit Profile Account. Create By Anh.Trần Create 8/4/2019. 
        public const string uspEditProfileAccount = "uspEditProfileAccount";
        //Create New Registration Car. Create By Anh.Trần Create 14/4/2019. 
        public const string uspCreateNewRegistrationCar = "uspCreateNewRegistrationCar";
        //--Cấp 3,4  Xem toàn bộ danh sách đơn cấp phát ở các khoa viện -> Xem theo trạng thái. Create By Anh.Trần Create 15/4/2019. 
        public const string uspManagerGetRegistrationCarAllUnitByProfileStaus = "uspManagerGetRegistrationCarAllUnitByProfileStaus {0}";
        // Xem chi tiết đơn cấp phát ở các trạng thái không duyệt và chờ duyệt -> Xem theo trạng thái. Create By Anh.Trần Create 15/4/2019. 
        public const string uspGetDetailRegistrationCarByNotRatify = "uspGetDetailRegistrationCarByNotRatify {0}"; //@RegistrationCarID
        // Lấy danh sách xe hoạt động Create By Anh.Trần Create 17/4/2019. 
        public const string uspGetListCarApproveRegistrationCar = "uspGetListCarApproveRegistrationCar"; 
        // Lấy danh sách đơn cấp phát đã duyệt, chờ đi Create By Anh.Trần Create 17/4/2019. 
        public const string uspGetListRegistrationApproveRegistrationCar = "uspGetListRegistrationApproveRegistrationCar"; 
        //Get List AssignDriver. Create By Mr.Lam Create 16/4/2019. 
        public const string uspGetListAssignDriver = "uspGetListAssignDriver";
        //Get List AssignDriver. Create By Mr.Lam Create 16/4/2019. 
        public const string uspGetListDriverNotInAssignDriver = "uspGetListDriverNotInAssignDriver";
        //Update Car Info. Create By Mr.Lam Create 17/4/2019. 
        public const string uspUpdateCarInfo = "uspUpdateCarInfo";
        //get Driver Manage Car. Create By Mr.Lam Create 17/4/2019. 
        public const string uspGetDriverManageCar = "uspGetDriverManageCar {0}";
        //Update RepairStatu. Create By Mr.Lam Create 17/4/2019. 
        public const string uspUpdateRepairStatus = "uspUpdateRepairStatus {0},{1},'{2}'";
        
    }

}