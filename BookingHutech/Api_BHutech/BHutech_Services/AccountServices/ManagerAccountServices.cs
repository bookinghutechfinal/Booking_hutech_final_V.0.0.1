using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Lib.Utils;
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
        /// Manager Get Account By Account StatusServices. Lấy danh sách tài khoản theo loại tài khoản và trạng thái tài khoản
        /// </summary>
        /// <param name="">ManagerGetAccountByAccountStatusRequestModel</param>
        /// <returns>managerGetAccountByAccountStatus</returns> 
        public ManagerGetAccountByAccountStatusResponseModel ManagerGetAccountByAccountStatusAccountTypeServices(ManagerGetAccountByAccountStatusRequestModel request)
        {

            ManagerGetAccountByAccountStatusResponseModel managerGetAccountByAccountStatus = new ManagerGetAccountByAccountStatusResponseModel();
            try
            {
                // tìm tất cả tài khoản hoạt động
                if(request.Account_Status == null && request.Unit_ID == 0 && request.AccountType == null)
                {
                    string stringSqlManagerGetListAccount = Prototype.SqlCommandStore.uspGetListAccount;
                    managerGetAccountByAccountStatus.GetAccountByAccountStatus = managerAccountDAO.GetAccountByAccountStatusAccountTypeDAO(stringSqlManagerGetListAccount, request);
                }
                else
                {
                    string stringSqlManagerGetListAccount = Prototype.SqlCommandStore.uspManagerGetAccountByAccountStatusAccountType;
                    managerGetAccountByAccountStatus.GetAccountByAccountStatus = managerAccountDAO.GetAccountByAccountStatusAccountTypeDAO(stringSqlManagerGetListAccount, request);
                }
               
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

                string stringSqlManagerGetDetailAccountByAccountID = String.Format(Prototype.SqlCommandStore.uspManagerGetDetailAccountByAccountID, request.Account_ID);
                string stringSqluspGetDetailRuleCodeByAccountID = String.Format(Prototype.SqlCommandStore.uspGetDetailRuleCodeByAccountID, request.Account_ID);

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
        public UpdateGroupRoleResponseModel ManagerUpdateGroupRoleService(UpdateGroupRoleRequestModel request)
        {

            try
            {
                UpdateGroupRoleResponseModel req = new UpdateGroupRoleResponseModel();
                string stringSqlManagerUpdateRroupRole = String.Format(Prototype.SqlCommandStore.uspManagerUpdateRroupRole);
                req = managerAccountDAO.ManagerUpdateGroupRoleDAO(stringSqlManagerUpdateRroupRole, request);
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
        public ManagerGetGroupRoleResponseModel ManagerGetGroupRoleServices()
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

        /// <summary>
        ///  Anh.Tran Ceate 24/3/2019. Lấy chi danh sách quyền. 
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ManagerGetRoleMasterByAccountIDResponseModel</returns>
        public ManagerGetRoleMasterByAccountIDResponseModel ManagerGetRoleMasterServices()
        {

            ManagerGetRoleMasterByAccountIDResponseModel req = new ManagerGetRoleMasterByAccountIDResponseModel();
            try
            {
                string stringSqluspManagerGetRoleMaster = String.Format(Prototype.SqlCommandStore.uspManagerGetRoleMaster);
                req.RoleMasterByAccountID = managerAccountDAO.ManagerGetRoleMasterByAccountIDDAO(stringSqluspManagerGetRoleMaster);
                return req;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        ///  Anh.Tran Ceate 19/3/2019. Lấy chi tiết những quyền chưa cấp cho account
        /// </summary>
        /// <param name="request">ManagerGetRoleMasterByAccountIDRequestModel</param>
        /// <returns>ManagerGetRoleMasterByAccountIDResponseModel</returns>
        public ManagerGetRoleMasterByAccountIDResponseModel ManagerGetRoleMasterByAccountIDServices(ManagerGetRoleMasterByAccountIDRequestModel request)
        {

            ManagerGetRoleMasterByAccountIDResponseModel req = new ManagerGetRoleMasterByAccountIDResponseModel();
            try
            {
                string stringSqluspManagerGetRoleMasterByAccountID = String.Format(Prototype.SqlCommandStore.uspManagerGetRoleMasterByAccountID, request.Account_ID);
                req.RoleMasterByAccountID = managerAccountDAO.ManagerGetRoleMasterByAccountIDDAO(stringSqluspManagerGetRoleMasterByAccountID);
                return req;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        ///  Anh.Tran Ceate 19/3/2019. Cập nhật tên quyền và lấy ds quyền. 
        /// </summary>
        /// <param name="request">ManagerUpdateRoleMasterRequestModel</param>
        /// <returns>ManagerUpdateRoleMasterResponseModel</returns>
        public ManagerUpdateRoleMasterResponseModel ManagerUpdateRoleMasterServices(ManagerUpdateRoleMasterRequestModel request)
        {

            ManagerUpdateRoleMasterResponseModel req = new ManagerUpdateRoleMasterResponseModel();
            try
            {
                string stringSqluspManagerUpdateRoleMaster = String.Format(Prototype.SqlCommandStore.uspManagerUpdateRoleMaster);
                req.ListRoleMaster = managerAccountDAO.ManagerUpdateRoleMasterDAO(stringSqluspManagerUpdateRoleMaster, request);
                return req;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        ///  Anh.Tran Ceate 19/3/2019. Cập nhật tên quyền và lấy ds quyền. 
        /// </summary>
        /// <param name="request">ManagerUpdateRoleMasterRequestModel</param>
        /// <returns>ManagerUpdateRoleMasterResponseModel</returns>
        public ManagerGetUnitResponseModel ManagerGetUnitServices()
        {

            ManagerGetUnitResponseModel req = new ManagerGetUnitResponseModel();
            try
            {
                string stringSqluspManagerGetUnit = String.Format(Prototype.SqlCommandStore.uspManagerGetUnit);
                req.ListUnit = managerAccountDAO.ManagerGetUnitDAO(stringSqluspManagerGetUnit);
                return req;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Anh.Trần Create 26/3/2019 Cập nhật trạng thái tài khoản, duyệt, loại tài khoản
        /// </summary>
        /// <param name="request">ManagerUpdateRoleMasterRequestModel</param> 
        public void ManagerUpdateAccountServices(ManagerUpdateAccountRequestModel request)
        {
            Helper helper = new Helper();
            try
            {
                //1. Update trạng thái account. 
                //2. Update password. 
                //3. Duyệt tài khoản. 
                //4. Loại tài  khoản.
                string stringSqlUpdateAccount = null;
                request.LastModifiedDate = DateTime.Parse(helper.ToDayDateTime());
                int result = helper.ManagerUpdateTypes(request);
                switch (result)
                {
                    case 1:
                        stringSqlUpdateAccount = "UPDATE Account SET Account_Status = '" + request.Account_Status + "' , LastModifiedDate = '" + request.LastModifiedDate + "'  WHERE Account_ID = '" + request.Account_ID + "' ";
                        break;
                    case 2:
                        // stringSqlUpdateAccount = "UPDATE Account SET  "; 
                        request.Password = EncodePassword.CreateSHA256(request.Password);
                        //stringSqlUpdateAccount = "UPDATE Account SET Account_Status = '" + request.Account_Status + "' , LastModifiedDate = '" + request.LastModifiedDate + "'  WHERE Account_ID = 'BK008' ";
                        break;
                    case 3:
                        stringSqlUpdateAccount = "UPDATE Account SET Verify = '" + request.Verify + "' , LastModifiedDate = '" + request.LastModifiedDate + "'  WHERE Account_ID = '" + request.Account_ID + "' ";
                        break;
                    case 4:
                        stringSqlUpdateAccount = "UPDATE Account SET AccountType = '" + request.AccountType + "' , LastModifiedDate = '" + request.LastModifiedDate + "'  WHERE Account_ID = '" + request.Account_ID + "' ";
                        break;
                    case 0:
                        throw new Exception();
                }
                managerAccountDAO.ManagerUpdateAccountDAO(stringSqlUpdateAccount);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Anh.Trần Create 8/4/2019. Chỉnh sửa thông tin tài khoản
        /// </summary>
        /// <param name="request">EditProfileAccountRequestModel</param>
        public void EditProfileAccountServices(EditProfileAccountRequestModel request)
        {
            Helper helper = new Helper();
            try
            {
                if (request.DriverLicenseNo == null) {
                    request.DriverLicenseNo = null; 
                }

                //string stringSqlUpdateAccount = " UPDATE Account SET Avatar = '"+ request.Avatar+ "'," +
                //    "Unit_ID = "+ request.Unit_ID+ "'," +
                //    "FullName = N'"+ request.FullName+ "', Gender = "+ request.Gender+ "," +
                //    "BirthDay = '" + request.Birthday + "'," +
                //    "NumberPhone = '" + request.NumberPhone + "'," +
                //    "Addres = N'" + request.Addres + "'," +
                //    "Email = '" + request.Email + "'," +
                //    "LastModifiedDate = GETDATE(), " +
                //    "AccountType = " + request.AccountType + ", " +
                //    "DriverLicenseNo = '" + request.DriverLicenseNo + "', " +
                //    "LicenseClass = '" + request.LicenseClass + "'," +
                //    "LicenseExpires = '" + request.LicenseExpires + "'" +
                //    "WHERE Account_ID = '" + request.Account_ID + "'";
                if (request.AvatarNew != null && request.AvatarNew != request.Avatar)
                {
                    string fileName = "Avatar" + helper.CreateID() + ".png";
                    UploadFile.DeleteImage(request.Avatar);
                    request.Avatar = UploadFile.UploadImage(request.AvatarNew, fileName);
                   
                }
                string stringSqluspEditProfileAccount = String.Format(Prototype.SqlCommandStore.uspEditProfileAccount);
                managerAccountDAO.EditProfileAccountDAO(stringSqluspEditProfileAccount, request); 
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }


        /// <summary>
        /// Anh.Trần Create 26/3/2019 Cập nhật trạng thái tài khoản, duyệt, loại tài khoản
        /// </summary>
        /// <param name="request">ManagerUpdateRoleMasterRequestModel</param> 
        public void ChangePasswordServices(ManagerUpdateAccountRequestModel request)
        {
            Helper helper = new Helper();
            try
            {
                String stringSqlChangePassword = String.Format(Prototype.SqlCommandStore.uspChangePasswordByAccountID);
                managerAccountDAO.ChangePasswordDAO(stringSqlChangePassword, request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// UpdateRoleServices
        /// Mr.Lam 24/4/2019
        /// </summary>
        /// <param name="request">list UpdateRoleRequestModel</param>
        public int UpdateRoleServices(List<UpdateRoleRequestModel> request)
        {
            try
            {
                string data = "";
                for (int i = 0; i < request.Count; i++)
                {
                    if (i == request.Count - 1)
                        data = data + "('" + request[i].Account_ID + "'" + "," + request[i].RoleMaster_ID + ",'" + request[i].RoleDetail_Status + "', getDate(), getDate(),N'" + request[i].FullNameUpdate + "')";
                    else
                        data = data + "('" + request[i].Account_ID + "'" + "," + request[i].RoleMaster_ID + ",'" + request[i].RoleDetail_Status + "', getDate(), getDate(),N'" + request[i].FullNameUpdate + "'),";
                }
                string stringSql = "begin try"
                                    + " begin transaction"
                                    + " insert into RoleDetail (Account_ID, RoleMaster_ID, RoleDetail_Status, CreateDate, LastModifiedDate, FullNameUpdate)"
                                    + " values " +
                                    data
                                    + " commit"
                                    + " end try"
                                    + " begin catch"
                                    + " rollback"
                                    + " end catch";
                int result = managerAccountDAO.UpdateRoleDAO(stringSql);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// DeleteRoleServices
        /// Mr.Lam 28/4/2019
        /// </summary>
        /// <param name="request">list DeleteRoleRequestModel</param>
        public int DeleteRoleServices(DeleteRoleRequestModel request)
        {
            try
            {
                string stringSql =String.Format(Prototype.SqlCommandStore.UpdateRoleDetailStatus,request.Account_ID,request.RoleMaster_ID,request.RoleDetail_Status);
                int result = managerAccountDAO.UpdateRoleDAO(stringSql);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }
    }
}