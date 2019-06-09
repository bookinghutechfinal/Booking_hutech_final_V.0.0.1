using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.BookingCar;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class AssignDriverDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        //static SqlDataAdapter adap;

        /// <summary>
        /// GetListCarDAO
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>list assignDriverInfo</returns> 
        public List<AssignDriverInfo> GetListAssignDriverDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<AssignDriverInfo> result = new List<AssignDriverInfo>();
            AssignDriverInfo assignDriverInfo;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    assignDriverInfo = new AssignDriverInfo();
                    assignDriverInfo.Account_ID = reader["Account_ID"].ToString();
                    if(reader["CarID"] != DBNull.Value)
                    {
                        assignDriverInfo.CarID = Int32.Parse(reader["CarID"].ToString());
                    }
                    assignDriverInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    if (reader["AssignStatus"] != DBNull.Value)
                    {
                        assignDriverInfo.AssignStatus = Int32.Parse(reader["AssignStatus"].ToString());
                    }
                    assignDriverInfo.FullName = reader["FullName"].ToString();
                    assignDriverInfo.CarNo = reader["CarNo"].ToString();
                    assignDriverInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();

                    result.Add(assignDriverInfo);
                }
                reader.NextResult();
                while (reader.Read())
                {
                    assignDriverInfo = new AssignDriverInfo();
                    assignDriverInfo.Account_ID = reader["Account_ID"].ToString();
                    if (reader["CarID"] != DBNull.Value)
                    {
                        assignDriverInfo.CarID = Int32.Parse(reader["CarID"].ToString());
                    }
                    assignDriverInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    if (reader["AssignStatus"] != DBNull.Value)
                    {
                        assignDriverInfo.AssignStatus = Int32.Parse(reader["AssignStatus"].ToString());
                    }
                    assignDriverInfo.FullName = reader["FullName"].ToString();
                    assignDriverInfo.CarNo = reader["CarNo"].ToString();
                    assignDriverInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();

                    result.Add(assignDriverInfo);
                }
                con.Close();
                return result;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("GetListAssignDriverDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                throw;
            }
        }

        /// <summary>
        /// AssignDriverManagerDAO
        /// Mr.Lam 17/4/2019
        /// </summary>
        public void AssignDriverManagerDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                int a=cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("AssignDriverManagerDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                throw;
            }
        }
    }
}