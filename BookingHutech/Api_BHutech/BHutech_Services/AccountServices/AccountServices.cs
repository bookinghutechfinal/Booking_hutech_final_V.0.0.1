using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Models.Request;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using BookingHutech.Api_BHutech.Lib.Utils;

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
              //  string uspGetRuleCodeByAccountID = Prototype.SqlCommandStore.uspGetDetailRuleCodeByAccountID + " '" + Account_ID + "' ";
                string uspGetRuleCodeByAccountID = String.Format(Prototype.SqlCommandStore.uspGetDetailRuleCodeByAccountID, Account_ID);
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
        public int ManagerCreateNewAccountServices(AddNewAccountRequestModel request)
        {
            try
            {
                request.createNewAccountRequestModel.Account_ID = helper.CreateID();
                request.createNewAccountRequestModel.Verify = true;
                string fileName = "Avatar" + helper.CreateID() + ".png";
                request.createNewAccountRequestModel.Avatar = UploadFile.UploadImage(request.createNewAccountRequestModel.Avatar, fileName);
                string data = "";
                for (int i = 0; i < request.updateRoleRequestModel.Count; i++)
                {
                    if (i == request.updateRoleRequestModel.Count - 1)
                        data = data + "('" + request.createNewAccountRequestModel.Account_ID + "'" + "," + request.updateRoleRequestModel[i].RoleMaster_ID + ",'" + request.updateRoleRequestModel[i].RoleDetail_Status + "', getDate(), getDate(),N'" + request.updateRoleRequestModel[i].FullNameUpdate + "')";
                    else
                        data = data + "('" + request.createNewAccountRequestModel.Account_ID + "'" + "," + request.updateRoleRequestModel[i].RoleMaster_ID + ",'" + request.updateRoleRequestModel[i].RoleDetail_Status + "', getDate(), getDate(),N'" + request.updateRoleRequestModel[i].FullNameUpdate + "'),";
                }
                string stringSql = "begin try"
                                    + " begin transaction"
                                    + " INSERT INTO  Account(Avatar, Account_ID, Unit_ID, FullName, UserName, Password, Gender, BirthDay, NumberPhone, Addres, Email, CreateDate, LastModifiedDate, IsChangePassword, Account_Status, Verify, AccountType, DriverLicenseNo, LicenseClass, LicenseExpires)"
                                    + " Values('" + request.createNewAccountRequestModel.Avatar + "', '" + request.createNewAccountRequestModel.Account_ID + "', " + request.createNewAccountRequestModel.Unit_ID + ", N'" + request.createNewAccountRequestModel.FullName + "', '" + request.createNewAccountRequestModel.UserName + "', '" + request.createNewAccountRequestModel.Password + "', " + request.createNewAccountRequestModel.Gender + ", '" + request.createNewAccountRequestModel.Birthday + "', '" + request.createNewAccountRequestModel.NumberPhone + "', N'" + request.createNewAccountRequestModel.Addres + "', '" + request.createNewAccountRequestModel.Email + "', GETDATE(), GETDATE(), 0, 1, '"+ request.createNewAccountRequestModel.Verify +"', '" + request.createNewAccountRequestModel.AccountType + "', '" + request.createNewAccountRequestModel.DriverLicenseNo + "', '" + request.createNewAccountRequestModel.LicenseClass + "', '" + request.createNewAccountRequestModel.LicenseExpires + "')"
                                    + " insert into RoleDetail (Account_ID, RoleMaster_ID, RoleDetail_Status, CreateDate, LastModifiedDate, FullNameUpdate)"
                                    + " values " +
                                    data
                                    + " commit"
                                    + " end try"
                                    + " begin catch"
                                    + " rollback"
                                    + " end catch";
                int result = accountDAO.AddNewAccountDAO(stringSql);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// Mr.Lam 16/4/2019
        /// GetListDriverNotInAssignDriver
        /// </summary>
        /// <returns>List Driver Not In AssignDriver</returns> 
        public AccountLoginResponseModel GetListDriverNotInAssignDriverServices()
        {

            AccountLoginResponseModel accountLoginResponse = new AccountLoginResponseModel();
            try
            {
                string uspGetListDriverNotInAssignDriver = Prototype.SqlCommandStore.uspGetListDriverNotInAssignDriver;
                accountLoginResponse.GetAccountInfo = accountDAO.GetAccountInfoDAO(uspGetListDriverNotInAssignDriver);
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