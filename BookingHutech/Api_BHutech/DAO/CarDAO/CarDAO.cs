using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.BookingCar;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class CarDAO
    {
        static DataAccess db;
        static SqlConnection con; 
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>list CarInfo</returns> 
        public List<CarInfo> GetListCarDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<CarInfo> result = new List<CarInfo>();
            CarInfo carInfo;
            try
            { 
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    carInfo = new CarInfo();
                    carInfo.CarID = Int32.Parse(reader["CarID"].ToString());
                    carInfo.CarNumber = reader["CarNumber"].ToString();
                    carInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    carInfo.CarTypeName = reader["CarTypeName"].ToString();
                    carInfo.CarName = reader["CarName"].ToString();
                    carInfo.CarImage = reader["CarImage"].ToString();
                    carInfo.Description = reader["Description"].ToString();
                    carInfo.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    carInfo.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    carInfo.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carInfo.Account_ID = reader["Account_ID"].ToString();
                    carInfo.Color = reader["Color"].ToString();
                    result.Add(carInfo) ;
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
        

        /// <summary>
        ///  Lấy danh sách loại xe. 
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>listCartype</returns>
        public List<CarTypeInfo> GetListCarTypeDAO(String stringSql)
        {
            try
            {
                List<CarTypeInfo> result = new List<CarTypeInfo>();
                CarTypeInfo carTypeInfo;
                db = new DataAccess();
                con = new SqlConnection(db.ConnectionString());
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    carTypeInfo = new CarTypeInfo();
                    carTypeInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    carTypeInfo.CarTypeName = reader["CarTypeName"].ToString();
                    carTypeInfo.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    carTypeInfo.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carTypeInfo.Account_ID = reader["Account_ID"].ToString();
                    result.Add(carTypeInfo);
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
 
