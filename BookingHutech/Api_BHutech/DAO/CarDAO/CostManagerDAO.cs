using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.BookingCar;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class CostManagerDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        /// <summary>
        /// GetListRepairCostDAO
        /// Mr.Lam 11/3/2019
        /// </summary>
        /// <returns> List RepairInfo </returns>
        public List<RepairInfo> GetListRepairCostDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<RepairInfo> result = new List<RepairInfo>();
            RepairInfo repairInfo;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    repairInfo = new RepairInfo();
                    repairInfo.RepairID = reader["RepairID"].ToString();
                    repairInfo.Car_ID = Int32.Parse(reader["Car_ID"].ToString());
                    repairInfo.CostsTypeID = Int32.Parse(reader["CostsTypeID"].ToString());
                    repairInfo.RepairAddres = reader["RepairAddres"].ToString();
                    repairInfo.Note = reader["Note"].ToString();
                    repairInfo.ImagerBill = reader["ImagerBill"].ToString();
                    repairInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    repairInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    repairInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();

                    result.Add(repairInfo);
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