using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.BookingCar;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class EmployeeDAO
    {
        static DataAccess db;
        static SqlConnection con; 
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        /// <summary>
        /// Anh.Tran: Create 23/2/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>list ListCarResponseModel</returns> 
        public List<ListCarResponseModel> GetListCarDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<ListCarResponseModel> request = new List<ListCarResponseModel>();
            ListCarResponseModel listCarResponseModel;
            try
            { 
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    listCarResponseModel = new ListCarResponseModel();
                    listCarResponseModel.CarID = Int32.Parse(reader["CarID"].ToString());
                    listCarResponseModel.CarNumber = reader["CarNumber"].ToString();
                    listCarResponseModel.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    listCarResponseModel.CarTypeName = reader["CarTypeName"].ToString();
                    listCarResponseModel.CarName = reader["CarName"].ToString();
                    listCarResponseModel.CarImage = reader["CarImage"].ToString();
                    listCarResponseModel.Description = reader["Description"].ToString();
                    listCarResponseModel.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    listCarResponseModel.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    listCarResponseModel.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    listCarResponseModel.Account_ID = reader["Account_ID"].ToString();
                    listCarResponseModel.Color = reader["Color"].ToString();
                    request.Add(listCarResponseModel) ;
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
        ///  Lấy danh sách loại xe. 
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>listCartype</returns>
        public List<CarTypeResponseModel> getListCarTypeDAO(String stringSql)
        {
            try
            {
                List<CarTypeResponseModel> request = new List<CarTypeResponseModel>();
                CarTypeResponseModel carTypeResponseModel;
                db = new DataAccess();
                con = new SqlConnection(db.ConnectionString());
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    carTypeResponseModel = new CarTypeResponseModel();
                    carTypeResponseModel.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    carTypeResponseModel.CarTypeName = reader["CarTypeName"].ToString();
                    carTypeResponseModel.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    carTypeResponseModel.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carTypeResponseModel.Account_ID = reader["Account_ID"].ToString();
                    request.Add(carTypeResponseModel);
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
 
