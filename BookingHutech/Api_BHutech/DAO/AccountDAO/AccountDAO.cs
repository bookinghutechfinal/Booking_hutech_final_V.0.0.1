using BookingHutech.Api_BHutech.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Models;
using System.Data;

namespace BookingHutech.Api_BHutech.DAO.AccountDAO
{
    public class AccountDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        //static SqlDataAdapter adap;

        /// <summary>
        /// GetAccountInfoDAO Anh.Tran: Create 1/3/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>AccountLoginResponseModel</returns> 
        public List<AccountInfo> GetAccountInfoDAO(String stringSql)
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
                    accountLoginResponseModel.Unit_ID = int.Parse(reader["Unit_ID"].ToString());
                    accountLoginResponseModel.UnitName = reader["UnitName"].ToString();
                    accountLoginResponseModel.Avatar = reader["Avatar"].ToString();
                    accountLoginResponseModel.Account_ID = reader["Account_ID"].ToString();
                    accountLoginResponseModel.FullName = reader["FullName"].ToString();
                    accountLoginResponseModel.Gender = int.Parse(reader["Gender"].ToString());
                    accountLoginResponseModel.Birthday = reader["Birthday"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["Birthday"].ToString());
                    accountLoginResponseModel.Addres = reader["Addres"].ToString();
                    accountLoginResponseModel.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    accountLoginResponseModel.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    accountLoginResponseModel.Session = reader["Session"].ToString(); 
                    accountLoginResponseModel.SessionDate =  reader["SessionDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["SessionDate"].ToString());
                    accountLoginResponseModel.IsChangePassword = bool.Parse(reader["IsChangePassword"].ToString());
                    accountLoginResponseModel.Account_Status = reader["Account_Status"].ToString();
                    accountLoginResponseModel.Verify = bool.Parse(reader["Verify"].ToString());
                    accountLoginResponseModel.AccountType = reader["AccountType"].ToString();
                    request.Add(accountLoginResponseModel);
                    
                }
                con.Close();
                return request;
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            } 
        }
 
        /// <summary>
        /// GetRoleMaster. Anh.Tran: Create 1/3/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>hsRoleCode</returns>
        public List<GetRoleCode> GetRoleCodeDAO(String stringSql)
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
                    roleCode.RoleDetail_Status = bool.Parse(reader["RoleDetail_Status"].ToString()); 
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
        /// Lam Create  AccountLogout. 28/2/2019
        /// </summary>
        /// <param name="request">AccountLogoutRequestModel</param>
        public void AccountLogoutDAO(AccountLogoutRequestModel request)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            try
            {
                string stringsqlAccountLogout = string.Format("{0} {1}", Prototype.SqlCommandStore.uspAccountLogout, request.Account_ID);
                con.Open();
                //cmd.CommandText = stringsqlAccountLogout;
                //cmd.Parameters.AddWithValue("@Account_ID", request.Account_ID);
                cmd = new SqlCommand(stringsqlAccountLogout, con);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
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
        public void CreateNewAccountDAO(String sqlStore, CreateNewAccountRequestModel request)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Avatar", SqlDbType.VarChar, 100).Value = request.Avatar;
            cmd.Parameters.Add("@Account_ID", SqlDbType.VarChar, 10).Value = request.Account_ID;
            cmd.Parameters.Add("@Unit_ID", SqlDbType.Int).Value = request.Unit_ID;
            cmd.Parameters.Add("@FullName", SqlDbType.NVarChar, 50).Value = request.FullName;
            cmd.Parameters.Add("@UserName", SqlDbType.Char, 20).Value = request.UserName;
            cmd.Parameters.Add("@Password", SqlDbType.Char, 200).Value = request.Password;
            cmd.Parameters.Add("@Gender", SqlDbType.TinyInt).Value = request.Gender;
            cmd.Parameters.Add("@BirthDay", SqlDbType.DateTime).Value = request.Birthday;
            cmd.Parameters.Add("@NumberPhone", SqlDbType.Char, 12).Value = request.NumberPhone;
            cmd.Parameters.Add("@Addres", SqlDbType.NVarChar, 100).Value = request.Addres;
            cmd.Parameters.Add("@Email", SqlDbType.VarChar, 20).Value = request.Email;
            cmd.Parameters.Add("@Verify", SqlDbType.Bit).Value = request.Verify;
            cmd.Parameters.Add("@AccountType", SqlDbType.Char, 1).Value = request.AccountType;

            if (request.DriverLicenseNo == null) 
                cmd.Parameters.Add("@DriverLicenseNo", SqlDbType.NChar, 20).Value = DBNull.Value; 
            else 
                cmd.Parameters.Add("@DriverLicenseNo", SqlDbType.NChar, 20).Value = request.DriverLicenseNo;
            if (request.LicenseClass == null)
                cmd.Parameters.Add("@LicenseClass", SqlDbType.NChar, 20).Value = DBNull.Value;
            else
                cmd.Parameters.Add("@LicenseClass", SqlDbType.NChar, 20).Value = request.LicenseClass;
            if (request.LicenseExpires == null)
                cmd.Parameters.Add("@LicenseExpires", SqlDbType.NChar, 20).Value = DBNull.Value;
            else
                cmd.Parameters.Add("@LicenseExpires", SqlDbType.NChar, 20).Value = request.LicenseExpires; 
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
                LogWriter.WriteException(ex);
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }

        }

        /// <summary>
        /// AddNewAccountDAO
        /// Mr.Lam 5/5/2019
        /// </summary>
        public int AddNewAccountDAO(string stringSql)
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
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            }
        }
    }
}