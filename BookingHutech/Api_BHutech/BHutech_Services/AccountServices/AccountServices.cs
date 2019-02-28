using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.BHutech_Services.AccountServices
{
    public class AccountServices
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public void AccountLogoutServices(AccountLogoutRequestModel request)
        {

            AccountDAO accountDAO = new AccountDAO();
            try
            { 
                accountDAO.AccountLogoutDAO(request); 
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex); 
            }

        }
    }
}