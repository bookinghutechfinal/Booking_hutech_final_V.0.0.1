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
        static SqlDataAdapter adap;

        /// <summary>
        /// GetAccountInfoDAO Anh.Tran: Create 10/3/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>GetAccountByAccountStatusDAO</returns> 
        public List<AccountInfo> GetAccountByAccountStatusDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<AccountInfo> request = new List<AccountInfo>();
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    AccountInfo accountLoginResponseModel = new AccountInfo();
                    accountLoginResponseModel.Account_ID = reader["Account_ID"].ToString();
                    accountLoginResponseModel.FullName = reader["FullName"].ToString();
                    accountLoginResponseModel.Gender = int.Parse(reader["Gender"].ToString());
                    accountLoginResponseModel.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    accountLoginResponseModel.Addres = reader["Addres"].ToString();
                    accountLoginResponseModel.IsChangePassword = bool.Parse(reader["IsChangePassword"].ToString());
                    accountLoginResponseModel.Account_Status = reader["Account_Status"].ToString();
                    accountLoginResponseModel.Verify = bool.Parse(reader["Verify"].ToString());
                    accountLoginResponseModel.AccountType = reader["AccountType"].ToString();
                    request.Add(accountLoginResponseModel);
                }
                con.Close();
                return request;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            }
        }

        /// <summary>
        /// Get Detail Account By AccountID DAO Anh.Tran: Create 10/3/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>AccountInfo</returns> 
        public List<AccountInfo> GetDetailAccountByAccountIDDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<AccountInfo> request = new List<AccountInfo>();
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    AccountInfo accountLoginResponseModel = new AccountInfo();
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
                LogWriter.WriteException(ex);
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
                LogWriter.WriteException(ex);
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
                    LogWriter.WriteLogMsg(string.Format(SqlCommandStore.ExcuteSpFail, sqlStore, res.ReturnCode, (int)res.ReturnCode));
                    throw new Exception();
                }
                return res;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.WriteException(ex);
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
                return listGroupRoles;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.WriteException(ex);
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// Anh.Tran Ceate 19/3/2019.Cập nhật tên quyền
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
                    roleMaster.GroupRoleID = Int32.Parse(reader["GroupRoleID"].ToString());
                    roleMaster.GroupRoleName = reader["GroupRoleName"].ToString();
                    roleMaster.RoleMaster_ID = Int32.Parse(reader["RoleMaster_ID"].ToString()); 
                    roleMaster.RoleName = reader["RoleName"].ToString();
                    listRoleMasters.Add(roleMaster);
                }
                return listRoleMasters;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.WriteException(ex);
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
                    LogWriter.WriteLogMsg(string.Format(SqlCommandStore.ExcuteSpFail, sqlStore, res.ReturnCode, (int)res.ReturnCode));
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
                LogWriter.WriteException(ex);
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
                LogWriter.WriteException(ex);
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }



    }

}