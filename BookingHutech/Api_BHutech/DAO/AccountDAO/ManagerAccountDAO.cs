using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using BookingHutech.Api_BHutech.Prototype;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
//using BookingHutech.Api_BHutech.Models.AccountModels; 

namespace BookingHutech.Api_BHutech.DAO.AccountDAO
{
    public class ManagerAccountDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        //static SqlDataAdapter adap;

        /// <summary>
        /// GetAccountInfoDAO Anh.Tran: Create 10/3/2019 Lấy danh sách tài khoản theo loại tài khoản và trạng thái tài khoản
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <param name="ManagerGetAccountByAccountStatusRequestModel">ManagerGetAccountByAccountStatusRequestModel</param>
        /// <returns>GetAccountByAccountStatusAccountTypeDAO</returns> 
        public List<AccountInfo> GetAccountByAccountStatusAccountTypeDAO(String sqlStore, ManagerGetAccountByAccountStatusRequestModel request)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;

            if (request.Unit_ID == 0)
            {
                cmd.Parameters.Add("@Unit_ID", SqlDbType.Int).Value = 0;
            }
            else
            {
                cmd.Parameters.Add("@Unit_ID", SqlDbType.Int).Value = request.Unit_ID;
            }
            if (request.AccountType == null)
            {
                cmd.Parameters.Add("@AccountType", SqlDbType.Int).Value = 0;
            }
            else
            {
                cmd.Parameters.Add("@AccountType", SqlDbType.Int).Value = request.AccountType;
            }
            if (request.Account_Status == null)
            {
                cmd.Parameters.Add("@Account_Status", SqlDbType.NVarChar, 100).Value = 0;
            }
            else
            {
                cmd.Parameters.Add("@Account_Status", SqlDbType.Int).Value = request.Account_Status;
            }
            //cmd.Parameters.Add("@Unit_ID", SqlDbType.Int).Value = request.Unit_ID;
            //cmd.Parameters.Add("@AccountType", SqlDbType.Int).Value = request.AccountType;
            //cmd.Parameters.Add("@Account_Status", SqlDbType.NVarChar, 100).Value = request.Account_Status;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
                SqlDataReader reader = cmd.ExecuteReader();
                List<AccountInfo> req = new List<AccountInfo>();
                while (reader.Read())
                {
                    AccountInfo accountLoginResponseModel = new AccountInfo();
                    accountLoginResponseModel.Avatar = reader["Avatar"].ToString();
                    accountLoginResponseModel.Account_ID = reader["Account_ID"].ToString();
                    accountLoginResponseModel.FullName = reader["FullName"].ToString();
                    accountLoginResponseModel.Gender = int.Parse(reader["Gender"].ToString());
                    accountLoginResponseModel.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    accountLoginResponseModel.Addres = reader["Addres"].ToString();
                    accountLoginResponseModel.IsChangePassword = bool.Parse(reader["IsChangePassword"].ToString());
                    accountLoginResponseModel.Account_Status = reader["Account_Status"].ToString();
                    accountLoginResponseModel.Verify = bool.Parse(reader["Verify"].ToString());
                    accountLoginResponseModel.AccountType = reader["AccountType"].ToString();
                    req.Add(accountLoginResponseModel);
                }
                con.Close();
                return req;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("GetAccountByAccountStatusAccountTypeDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Get Detail Account By AccountID DAO Anh.Tran: Create 10/3/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>AccountInfo</returns> 
        public List<AccountInfo> GetDetailAccountByAccountIDDAO(String sqlStore)
        {

            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<AccountInfo> request = new List<AccountInfo>();
            try
            {
                con.Open();
                cmd = new SqlCommand(sqlStore, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    AccountInfo accountLoginResponseModel = new AccountInfo();
                    accountLoginResponseModel.Avatar = reader["Avatar"].ToString();
                    accountLoginResponseModel.Account_ID = reader["Account_ID"].ToString();
                    accountLoginResponseModel.FullName = reader["FullName"].ToString();
                    accountLoginResponseModel.Gender = int.Parse(reader["Gender"].ToString());
                    accountLoginResponseModel.Birthday = reader["Birthday"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["Birthday"].ToString());
                    accountLoginResponseModel.NumberPhone = reader["NumberPhone"].ToString() == "" ? null : reader["NumberPhone"].ToString();
                    accountLoginResponseModel.Addres = reader["Addres"].ToString() == "" ? null : reader["Addres"].ToString();
                    accountLoginResponseModel.Email = reader["Email"].ToString() == "" ? null : reader["Email"].ToString();
                    accountLoginResponseModel.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    accountLoginResponseModel.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    accountLoginResponseModel.IsChangePassword = bool.Parse(reader["IsChangePassword"].ToString());
                    accountLoginResponseModel.Account_Status = reader["Account_Status"].ToString();
                    accountLoginResponseModel.Verify = bool.Parse(reader["Verify"].ToString());
                    accountLoginResponseModel.AccountType = reader["AccountType"].ToString();
                    accountLoginResponseModel.Unit_ID = int.Parse(reader["Unit_ID"].ToString());
                    accountLoginResponseModel.UnitName = reader["UnitName"].ToString();
                    accountLoginResponseModel.Manager = reader["Manager"].ToString();
                    accountLoginResponseModel.EmailManager = reader["EmailManager"].ToString();
                    accountLoginResponseModel.NumberPhoneManager = reader["NumberPhoneManager"].ToString();
                    accountLoginResponseModel.DriverLicenseNo = reader["DriverLicenseNo"].ToString() == "" ? null : reader["DriverLicenseNo"].ToString();
                    accountLoginResponseModel.LicenseClass = reader["LicenseClass"].ToString() == "" ? null : reader["LicenseClass"].ToString();
                    accountLoginResponseModel.LicenseExpires = reader["LicenseExpires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LicenseExpires"].ToString());
                    request.Add(accountLoginResponseModel);
                }
                con.Close();
                return request;
            }
            catch (Exception ex)
            {
                LogWriter.MyWriteLogData("GetDetailAccountByAccountIDDAO", sqlStore, null, null, ex, "Exc SP = " + sqlStore + " fail");
                con.Close();
                throw;
            }
        }


        /// <summary>
        /// Anh.Tran: Create 11/3/2019 
        /// </summary> GetDetailRoleCodeByAccountIDDAO
        /// <param name="stringSql">stringSql</param>
        /// <returns>hsRoleCode</returns>
        public List<GetRoleCode> GetDetailRoleCodeByAccountIDDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<GetRoleCode> hsRoleCode = new List<GetRoleCode>();
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    GetRoleCode roleCode = new GetRoleCode();
                    roleCode.RoleCode = Int32.Parse(reader["RoleCode"].ToString());
                    roleCode.RoleMaster_ID = Int32.Parse(reader["RoleMaster_ID"].ToString());
                    roleCode.RoleName = reader["RoleName"].ToString() == "" ? null : reader["RoleName"].ToString();
                    roleCode.RoleDetail_Status = bool.Parse(reader["RoleDetail_Status"].ToString() == "" ? null : reader["RoleDetail_Status"].ToString());
                    roleCode.FullNameUpdate = reader["FullNameUpdate"].ToString() == "" ? null : reader["FullNameUpdate"].ToString();
                    hsRoleCode.Add(roleCode);
                }
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("GetDetailRoleCodeByAccountIDDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                throw;
            }
            return hsRoleCode;
        }

        /// <summary>
        /// Anh.Trần Create 15/3/2019
        /// </summary>
        /// <param name="sqlStore">sqlStore</param>
        /// <param name="request">UpdateGroupRoleRequestModel</param>
        /// <returns>UpdateGroupRoleResponseModel</returns>
        public UpdateGroupRoleResponseModel ManagerUpdateGroupRoleDAO(String sqlStore, UpdateGroupRoleRequestModel request)
        {
            UpdateGroupRoleResponseModel res = new UpdateGroupRoleResponseModel();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@GroupRoleID", SqlDbType.Int).Value = request.GroupRoleID;
            cmd.Parameters.Add("@GroupRoleName", SqlDbType.NVarChar, 50).Value = request.GroupRoleName;

            cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
                res.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                if (res.ReturnCode != GroupRoleResponseType.Success)
                {
                    throw new Exception();
                }
                return res;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("ManagerUpdateGroupRoleDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Anh.trần Create 17/3/2019
        /// </summary> 
        /// <returns>GroupRole</returns>
        public List<Models.AccountModels.GroupRole> ManagerGetGroupRoleDAO(String sqlStore)
        {
            List<Models.AccountModels.GroupRole> listGroupRoles = new List<Models.AccountModels.GroupRole>();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            //cmd.CommandType = CommandType.StoredProcedure;

            //cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }

                SqlDataReader reader = cmd.ExecuteReader();
                //   groupRole.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                //if (groupRole.ReturnCode != GroupRoleResponseType.Success)
                //{
                //    LogWriter.WriteLogMsg(string.Format(SqlCommandStore.ExcuteSpFail, sqlStore, groupRole.ReturnCode, (int)groupRole.ReturnCode));
                //    throw new Exception();
                //}
                while (reader.Read())
                {
                    Models.AccountModels.GroupRole groupRole = new Models.AccountModels.GroupRole();
                    groupRole.GroupRoleID = Int32.Parse(reader["GroupRoleID"].ToString());
                    groupRole.GroupRoleName = reader["GroupRoleName"].ToString();
                    listGroupRoles.Add(groupRole);
                }
                con.Close();
                return listGroupRoles;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("ManagerGetGroupRoleDAO", sqlStore, null, null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Anh.Tran Ceate 19/3/2019. Lấy chi danh sách  quyền
        /// </summary>
        /// <param name="sqlStore">sqlStore</param>
        /// <returns> List<RoleMaster> </returns>
        public List<Models.AccountModels.RoleMaster> ManagerGetRoleMasterByAccountIDDAO(String sqlStore)
        {
            List<Models.AccountModels.RoleMaster> listRoleMasters = new List<Models.AccountModels.RoleMaster>();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Models.AccountModels.RoleMaster roleMaster = new Models.AccountModels.RoleMaster();
                    roleMaster.RoleMaster_ID = Int32.Parse(reader["RoleMaster_ID"].ToString());
                    roleMaster.RoleName = reader["RoleName"].ToString();
                    listRoleMasters.Add(roleMaster);
                }
                return listRoleMasters;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("ManagerGetRoleMasterByAccountIDDAO", sqlStore, null, null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

        /// <summary>
        /// Anh.Trần Create 15/3/2019 Cập nhật tên quyền. trả về ds quyền. 
        /// </summary>
        /// <param name="sqlStore">sqlStore</param>
        /// <param name="request">UpdateGroupRoleRequestModel</param>
        /// <returns>ManagerUpdateRoleMasterResponseModel</returns>
        public List<Models.AccountModels.RoleMaster> ManagerUpdateRoleMasterDAO(String sqlStore, ManagerUpdateRoleMasterRequestModel request)
        {
            ManagerUpdateRoleMasterResponseModel res = new ManagerUpdateRoleMasterResponseModel();
            List<Models.AccountModels.RoleMaster> listRoleMasters = new List<Models.AccountModels.RoleMaster>();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@RoleMaster_ID", SqlDbType.Int).Value = request.RoleMaster_ID;
            cmd.Parameters.Add("@RoleName", SqlDbType.NVarChar, 100).Value = request.RoleName;
            cmd.Parameters.Add("@UserNameUpdate", SqlDbType.NVarChar, 20).Value = request.UserNameUpdate;

            cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
                res.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                if (res.ReturnCode != GroupRoleResponseType.Success)
                {
                    LogWriter.MyWriteLogData("ManagerUpdateRoleMasterDAO", sqlStore, request.ToString(), "DB Return code = (" + (int)res.ReturnCode + ")", null, "Exc SP = " + sqlStore + " fail");
                    throw new Exception();
                }
                // #
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Models.AccountModels.RoleMaster roleMaster = new Models.AccountModels.RoleMaster();
                    roleMaster.RoleMaster_ID = Int32.Parse(reader["RoleMaster_ID"].ToString());
                    roleMaster.RoleName = reader["RoleName"].ToString();
                    roleMaster.Role_Status = bool.Parse(reader["Role_Status"].ToString());
                    roleMaster.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    roleMaster.UserNameUpdate = reader["UserNameUpdate"].ToString();
                    listRoleMasters.Add(roleMaster);
                }
                return listRoleMasters;
                // #
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("ManagerUpdateRoleMasterDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Anh.trần Create 17/3/2019. Xem danh sách khoa/viện/đơn vị
        /// </summary> 
        /// <returns>ManagerGetUnitDAO</returns>
        public List<Models.AccountModels.Unit> ManagerGetUnitDAO(String sqlStore)
        {
            List<Models.AccountModels.Unit> listUnits = new List<Models.AccountModels.Unit>();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            //cmd.CommandType = CommandType.StoredProcedure;

            //cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }

                SqlDataReader reader = cmd.ExecuteReader();
                //   groupRole.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                //if (groupRole.ReturnCode != GroupRoleResponseType.Success)
                //{
                //    LogWriter.WriteLogMsg(string.Format(SqlCommandStore.ExcuteSpFail, sqlStore, groupRole.ReturnCode, (int)groupRole.ReturnCode));
                //    throw new Exception();
                //}
                while (reader.Read())
                {
                    Models.AccountModels.Unit unit = new Models.AccountModels.Unit();
                    unit.Unit_ID = Int32.Parse(reader["Unit_ID"].ToString());
                    unit.UnitName = reader["UnitName"].ToString();
                    unit.UnitManager = reader["UnitManager"].ToString();
                    unit.EmailManage = reader["EmailManage"].ToString();
                    unit.NumberPhoneManager = reader["NumberPhoneManager"].ToString();
                    listUnits.Add(unit);
                }
                return listUnits;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("ManagerGetUnitDAO", sqlStore, null, null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Anh.Trần Create 26/3/2019 Cập nhật trạng thái tài khoản, duyệt, loại tài khoản
        /// </summary>
        /// <param name="sqlStore">StrQuery</param> 
        public void ManagerUpdateAccountDAO(String StrQuery)
        {

            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(StrQuery, con);
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.WriteException("Function ManagerUpdateAccountDAO fail. Exc SP = " + StrQuery + " fail. Exception detail = ( " + ex.ToString() + " )");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }
        /// <summary>
        /// Anh.Trần Create 8/4/2019. Chỉnh sửa thông tin tài khoản
        /// </summary>
        /// <param name="sqlStore">sqlStore</param> 
        public void EditProfileAccountDAO(String sqlStore, EditProfileAccountRequestModel request)
        {

            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Avatar", SqlDbType.VarChar, 100).Value = request.Avatar;
            cmd.Parameters.Add("@Account_ID", SqlDbType.VarChar, 10).Value = request.Account_ID;
            cmd.Parameters.Add("@Unit_ID", SqlDbType.Int).Value = request.Unit_ID;
            cmd.Parameters.Add("@FullName", SqlDbType.NVarChar, 50).Value = request.FullName;
            cmd.Parameters.Add("@Gender", SqlDbType.TinyInt).Value = request.Gender;
            cmd.Parameters.Add("@BirthDay", SqlDbType.DateTime).Value = DateTime.Now;
            cmd.Parameters.Add("@NumberPhone", SqlDbType.Char, 12).Value = request.NumberPhone;
            cmd.Parameters.Add("@Addres", SqlDbType.NVarChar, 100).Value = request.Addres;
            cmd.Parameters.Add("@Email", SqlDbType.VarChar, 20).Value = request.Email;
            cmd.Parameters.Add("@AccountType", SqlDbType.Char, 1).Value = request.AccountType;
            cmd.Parameters.Add("@Account_Status", SqlDbType.Char, 1).Value = request.Account_Status;

            if (request.DriverLicenseNo == null)
                cmd.Parameters.Add("@DriverLicenseNo", SqlDbType.NChar, 20).Value = DBNull.Value;
            else
                cmd.Parameters.Add("@DriverLicenseNo", SqlDbType.NChar, 20).Value = request.DriverLicenseNo;
            if (request.LicenseClass == null)
                cmd.Parameters.Add("@LicenseClass", SqlDbType.NChar, 20).Value = DBNull.Value;
            else
                cmd.Parameters.Add("@LicenseClass", SqlDbType.NChar, 20).Value = request.LicenseClass;
            if (request.LicenseExpires == null)
                cmd.Parameters.Add("@LicenseExpires", SqlDbType.DateTime).Value = DBNull.Value;
            else
                cmd.Parameters.Add("@LicenseExpires", SqlDbType.DateTime).Value = request.LicenseExpires;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("EditProfileAccountDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Anh create 23/4/2019. Đổi mật khẩu
        /// </summary>
        /// <param name="sqlStore"></param>
        /// <param name="request"></param>
        public void ChangePasswordDAO(String sqlStore, ManagerUpdateAccountRequestModel request)
        {
            ManagerUpdateAccountRequestModel req = new ManagerUpdateAccountRequestModel();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Account_ID", SqlDbType.VarChar, 10).Value = request.Account_ID;
            cmd.Parameters.Add("@Password", SqlDbType.Char, 200).Value = request.Password;
            cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }

                SqlDataReader reader = cmd.ExecuteReader();
                req.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                if (req.ReturnCode != GroupRoleResponseType.Success)
                {
                    LogWriter.MyWriteLogData("EditProfileAccountDAO", sqlStore, request.ToString(), "DB Return = " + req.ReturnCode, null, "Exc SP = " + sqlStore + " fail");
                    throw new Exception();
                }
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("ChangePasswordDAO", sqlStore, request.ToString(), "DB Return = " + req.ReturnCode, null, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

        /// <summary>
        /// UpdateRoleDAO
        /// Mr.Lam 24/4/2019
        /// </summary>
        public int UpdateRoleDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                int a = cmd.ExecuteNonQuery();
                con.Close();
                if (a == 0)
                {
                    return 2;
                }
                return 1;
            }
            catch (Exception ex)
            {
                LogWriter.MyWriteLogData("UpdateRoleDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                con.Close();
                throw;
            }
        }
    }
}