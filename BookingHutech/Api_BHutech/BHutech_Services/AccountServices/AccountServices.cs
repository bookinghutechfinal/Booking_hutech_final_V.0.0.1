using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Models.Request;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.BHutech_Services.AccountServices
{
    public class AccountServices
    {
        AccountDAO accountDAO = new AccountDAO();
        Helper helper = new Helper(); 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public void AccountLogoutServices(AccountLogoutRequestModel request)
        {

            try
            {
                accountDAO.AccountLogoutDAO(request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Anh.Tran: Create 24/1/2019 
        /// GetListCarDAL
        /// </summary>
        /// <param name="">ListCarRequestModel</param>
        /// <returns>ListCarResponseModel</returns> 
        public AccountLoginResponseModel AccountLoginServices(AccountLoginRequestModel request)
        {

            AccountLoginResponseModel accountLoginResponse = new AccountLoginResponseModel();
            try
            {
                string uspAccountLogin = Prototype.SqlCommandStore.uspAccountLogin + " '" + request.UserName + "' , '" + request.Password + "' ";
                string uspGetRuleCodeByAccount = Prototype.SqlCommandStore.uspGetRuleCodeByAccount + " '" + request.UserName + "' , '" + request.Password + "' ";
                accountLoginResponse.GetAccountInfo = accountDAO.GetAccountInfoDAO(uspAccountLogin);
                if (accountLoginResponse.GetAccountInfo.Count != 0)
                {
                    accountLoginResponse.GetRoleCode = accountDAO.GetRoleCodeDAO(uspGetRuleCodeByAccount);
                }
                return accountLoginResponse;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Anh.Tran: Create 24/1/2019 
        /// GetListCarDAL
        /// </summary>
        /// <param name="">ListCarRequestModel</param>
        /// <returns>ListCarResponseModel</returns> 
        public CheckPermissionResponseModel CheckPermissionsServices(String Account_ID)
        {

            CheckPermissionResponseModel checkPermissionResponse = new CheckPermissionResponseModel();
            try
            {
                string uspGetAccountInfoByAccountID = Prototype.SqlCommandStore.uspGetAccountInfoByAccountID + " '" + Account_ID + "' ";
                string uspGetRuleCodeByAccountID = Prototype.SqlCommandStore.uspGetDetailRuleCodeByAccountID + " '" +  Account_ID + "' ";
                checkPermissionResponse.GetAccountInfo = accountDAO.GetAccountInfoDAO(uspGetAccountInfoByAccountID);
                if (checkPermissionResponse.GetAccountInfo.Count != 0)
                {
                    checkPermissionResponse.GetRoleCode = accountDAO.GetRoleCodeDAO(uspGetRuleCodeByAccountID);
                }
                return checkPermissionResponse;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Create by Anh.Trần. 22/3/2019 
        /// Quản trị có quyền thêm mới tài khoản
        ///  request.Verify = true; 
        /// </summary>
        /// <param name="request"></param>
        public void ManagerCreateNewAccountServices(CreateNewAccountRequestModel request)
        {

            try
            {
                request.Account_ID = helper.CreateID(); 
                request.Verify = true; 
                string stringSqluspCreateNewAccount = String.Format(Prototype.SqlCommandStore.uspCreateNewAccount);
                accountDAO.CreateNewAccountDAO(stringSqluspCreateNewAccount, request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }
    }
}