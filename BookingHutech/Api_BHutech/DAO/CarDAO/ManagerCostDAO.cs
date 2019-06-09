using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.BookingCar;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class ManagerCostDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        //static SqlDataAdapter adap;

        /// <summary>
        /// GetListRepairCostDAO
        /// Mr.Lam 11/3/2019
        /// </summary>
        /// <returns> List listRepairCost </returns>
        public List<ListRepairCost> GetListRepairCostDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<ListRepairCost> result = new List<ListRepairCost>();
            ListRepairCost listRepairCost;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    listRepairCost = new ListRepairCost();
                    listRepairCost.RepairID = reader["RepairID"].ToString();
                    if (reader["Car_ID"] != DBNull.Value)
                    {
                        listRepairCost.Car_ID = Int32.Parse(reader["Car_ID"].ToString());
                    }
                    if (reader["CostsTypeID"] != DBNull.Value)
                    {
                        listRepairCost.CostsTypeID = Int32.Parse(reader["CostsTypeID"].ToString());
                    }
                    listRepairCost.RepairAddres = reader["RepairAddres"].ToString();
                    listRepairCost.Note = reader["Note"].ToString();
                    listRepairCost.ImagerBill = reader["ImagerBill"].ToString();
                    listRepairCost.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    listRepairCost.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    listRepairCost.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    listRepairCost.CarImage = reader["CarImage"].ToString();
                    listRepairCost.CarNo = reader["CarNo"].ToString();
                    listRepairCost.AccountCreate = reader["AccountCreate"].ToString();
                    if (reader["RepairStatus"] != DBNull.Value)
                    {
                        listRepairCost.RepairStatus = Int32.Parse(reader["RepairStatus"].ToString());
                    }
                    if (reader.FieldCount > 13)
                    {
                        if (reader["RepairDetailID"] != DBNull.Value)
                        {
                            listRepairCost.RepairDetailID = Int32.Parse(reader["RepairDetailID"].ToString());
                        }
                        listRepairCost.CostsTypeName = reader["CostsTypeName"].ToString();
                        listRepairCost.Content = reader["Content"].ToString();
                        if (reader["TotalMoney"] != DBNull.Value)
                        {
                            listRepairCost.TotalMoney = decimal.Parse(reader["TotalMoney"].ToString());
                        }
                        if (reader["Quantity"] != DBNull.Value)
                        {
                            listRepairCost.Quantity = Int32.Parse(reader["Quantity"].ToString());
                        }
                    }

                    result.Add(listRepairCost);
                }
                con.Close();
                return result;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("GetListRepairCostDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                throw;
            }
        }

        /// <summary>
        /// UpdateRepairStatusDAO
        /// Mr.Lam 17/4/2019
        /// </summary>
        public void UpdateRepairStatusDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.MyWriteLogData("UpdateRepairStatusDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                throw;
            }
        }

        /// <summary>
        /// AddNewCostDAO
        /// Mr.Lam 18/4/2019
        /// </summary>
        public int AddNewCostDAO(string stringSql)
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
                con.Close();
                LogWriter.MyWriteLogData("AddNewCostDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                throw;
            }
        }
    }
}