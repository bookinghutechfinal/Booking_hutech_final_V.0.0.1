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

namespace BookingHutech.Api_BHutech.DAO.AccountDAO
{
    public class AccountDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        static SqlDataAdapter adap;

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
                    return request;
                }
                con.Close();
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            }
            return request;
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
                    accountLoginResponseModel.Addres = reader["Addres"].ToString() == ""?null : reader["Addres"].ToString();
                    accountLoginResponseModel.Email = reader["Email"].ToString() == ""?null : reader["Email"].ToString();
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
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            }
            return request;
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

    }
}