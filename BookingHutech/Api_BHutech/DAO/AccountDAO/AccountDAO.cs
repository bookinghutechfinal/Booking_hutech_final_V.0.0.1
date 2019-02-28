using BookingHutech.Api_BHutech.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Lib;

namespace BookingHutech.Api_BHutech.DAO.AccountDAO
{
    public class AccountDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        static SqlDataAdapter adap;

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
            }
        }
          
    }
}