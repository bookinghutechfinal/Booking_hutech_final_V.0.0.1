﻿using System;
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
        static SqlDataAdapter adap;

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
                    listRepairCost.Car_ID = Int32.Parse(reader["Car_ID"].ToString());
                    listRepairCost.CostsTypeID = Int32.Parse(reader["CostsTypeID"].ToString());
                    listRepairCost.RepairAddres = reader["RepairAddres"].ToString();
                    listRepairCost.Note = reader["Note"].ToString();
                    listRepairCost.ImagerBill = reader["ImagerBill"].ToString();
                    listRepairCost.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    listRepairCost.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    listRepairCost.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    listRepairCost.CarImage = reader["CarImage"].ToString();
                    listRepairCost.CarNo = reader["CarNo"].ToString();
                    if (reader.FieldCount > 11)
                    {
                        listRepairCost.RepairDetailID = Int32.Parse(reader["RepairDetailID"].ToString());
                        listRepairCost.CostsTypeName = reader["CostsTypeName"].ToString();
                        listRepairCost.Content = reader["Content"].ToString();
                        listRepairCost.TotalMoney = decimal.Parse(reader["TotalMoney"].ToString());
                        listRepairCost.Quantity = Int32.Parse(reader["Quantity"].ToString());
                    }

                    result.Add(listRepairCost);
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