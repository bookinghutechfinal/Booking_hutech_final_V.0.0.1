using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
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
                // LogWriter.WriteException(ex);
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
    }
}