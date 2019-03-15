using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class ManagerReportDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        /// <summary>
        /// ReportCostDAO
        /// Mr.Lam 14/3/2019
        /// </summary>
        /// <returns> List ReportCost </returns>
        public List<ReportCost> ReportCostDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<ReportCost> result = new List<ReportCost>();
            ReportCost reportCost;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    reportCost = new ReportCost();
                    reportCost.label = reader["CarNo"].ToString();
                    reportCost.value = Int32.Parse(reader["TotalCost"].ToString());
                    
                    result.Add(reportCost);
                }
                con.Close();
                return result;
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