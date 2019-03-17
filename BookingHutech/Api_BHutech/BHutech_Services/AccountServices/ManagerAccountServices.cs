using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
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
    public class ManagerAccountServices
    {
        ManagerAccountDAO managerAccountDAO = new ManagerAccountDAO();  
        /// <summary>
        /// Anh.Tran: Create 24/1/2019 
        /// Manager Get Account By Account StatusServices
        /// </summary>
        /// <param name="">ManagerGetAccountByAccountStatusRequestModel</param>
        /// <returns>managerGetAccountByAccountStatus</returns> 
        public ManagerGetAccountByAccountStatusResponseModel ManagerGetAccountByAccountStatusServices(ManagerGetAccountByAccountStatusRequestModel request)
        {

            ManagerGetAccountByAccountStatusResponseModel managerGetAccountByAccountStatus = new ManagerGetAccountByAccountStatusResponseModel();
            try
            {
                string stringSqlManagerGetAccountByAccountStatus = String.Format(Prototype.SqlCommandStore.uspManagerGetAccountByAccountStatus, request.Account_Status);
                managerGetAccountByAccountStatus.GetAccountByAccountStatus = managerAccountDAO.GetAccountByAccountStatusDAO(stringSqlManagerGetAccountByAccountStatus);
                return managerGetAccountByAccountStatus;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Anh.Tran: Create 10/3/2019 
        /// Hàm lấy chi tiết thông tin account và chi tiết quyền của 1 account. 
        /// </summary>
        /// <param name="">ManagerGetDetailAccountByAccountIDRequestModel</param>
        /// <returns>ManagerGetDetailAccountByAccountIDResponseModel</returns> 
        public ManagerGetDetailAccountByAccountIDResponseModel ManagerGetDetailAccountByAccountIDServices(ManagerGetDetailAccountByAccountIDRequestModel request)
        {

            ManagerGetDetailAccountByAccountIDResponseModel accountDetailResponse = new ManagerGetDetailAccountByAccountIDResponseModel();
            try
            {
                ManagerAccountDAO managerAccountDAO = new ManagerAccountDAO();
                 
                string stringSqlManagerGetDetailAccountByAccountID = String.Format(Prototype.SqlCommandStore.uspManagerGetDetailAccountByAccountID, request.Account_ID );
                string stringSqluspGetDetailRuleCodeByAccountID = String.Format(Prototype.SqlCommandStore.uspGetDetailRuleCodeByAccountID, request.Account_ID );
               
                accountDetailResponse.GetAccountInfo = managerAccountDAO.GetDetailAccountByAccountIDDAO(stringSqlManagerGetDetailAccountByAccountID);
                if (accountDetailResponse.GetAccountInfo.Count != 0)
                {
                    accountDetailResponse.GetRoleCode = managerAccountDAO.GetDetailRoleCodeByAccountIDDAO(stringSqluspGetDetailRuleCodeByAccountID);
                }
                return accountDetailResponse;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// ManagerUpdateGroupRoleService. Anh.Tran Create 16/3/2019
        /// </summary>
        /// <param name="request">UpdateGroupRoleRequestModel</param>
        /// <returns>UpdateGroupRoleResponseModel</returns>
        public UpdateGroupRoleResponseModel ManagerUpdateGroupRoleService(UpdateGroupRoleRequestModel request) {

            try
            {
                UpdateGroupRoleResponseModel req = new UpdateGroupRoleResponseModel();
                string stringSqlManagerUpdateRroupRole = String.Format(Prototype.SqlCommandStore.uspManagerUpdateRroupRole);
                req = managerAccountDAO.ManagerUpdateGroupRoleDAO(stringSqlManagerUpdateRroupRole,request);
                return req;
            }
            catch (Exception)
            {

                throw;
            }


           
        }

        /// <summary>
        /// Anh.trần Create 17/3/2019
        /// </summary> 
        /// <returns>ManagerGetGroupRoleResponseModel</returns>
        public ManagerGetGroupRoleResponseModel ManagerGetGroupRoleDAOServices()
        {

            ManagerGetGroupRoleResponseModel req = new ManagerGetGroupRoleResponseModel();
            try
            {
                string stringSqluspManagerGetGroupRole = String.Format(Prototype.SqlCommandStore.uspManagerGetGroupRole);
                req.ListGroupRole = managerAccountDAO.ManagerGetGroupRoleDAO(stringSqluspManagerGetGroupRole);
                return req;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }
    }
}