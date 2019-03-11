using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

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
                    accountLoginResponseModel.Email = reader["EmailManager"].ToString();
                    accountLoginResponseModel.NumberPhone = reader["NumberPhoneManager"].ToString();
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
                    roleCode.RoleDetail_Status = bool.Parse (reader["RoleDetail_Status"].ToString()  == "" ? null : reader["RoleDetail_Status"].ToString() );
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
    }
}