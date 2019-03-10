using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models;
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
    }
}