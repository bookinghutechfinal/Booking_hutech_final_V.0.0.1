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
using static BookingHutech.Api_BHutech.Models.Response.BookingCarResponse.CarInfo;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class EmployeeDAO
    {
        static DataAccess db;
        static SqlConnection con; 
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        CarResponseModel res = new CarResponseModel();

        /// <summary>
        /// Anh.Tran: Create 23/2/2019 
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>list ListCarResponseModel</returns> 
        public List<ListCarResponseModel> GetListEmployeeDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<ListCarResponseModel> request = new List<ListCarResponseModel>(); 
            try
            { 
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ListCarResponseModel listCarResponseModel = new ListCarResponseModel();
                    listCarResponseModel.CarID = Int32.Parse(reader["CarID"].ToString());
                    listCarResponseModel.CarName = reader["CarName"].ToString();
                    listCarResponseModel.CarNumber = reader["CarNumber"].ToString();
                    listCarResponseModel.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    listCarResponseModel.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    request.Add(listCarResponseModel) ;
                } 
                con.Close(); 
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex); 
                con.Close(); 
            }
            return request;
        }

        /// <summary>
        ///  Hàm 1:  lấy danh sách xe trống, hoạt động,xe có người booking. 
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>listCar</returns>
        public List<CarInfo> getCarInfo(String stringSql)
        {
            try
            {
                List<CarInfo> listCar = new List<CarInfo>();
                CarInfo carInfo;
                db = new DataAccess();
                con = new SqlConnection(db.ConnectionString());
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    carInfo = new CarInfo();
                    carInfo.CarID = Int32.Parse(reader["CarID"].ToString());
                    carInfo.CarNumber = reader["CarNumber"].ToString();
                    carInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    carInfo.CarTypeName = reader["CarTypeName"].ToString();  // Update 10/11/2018 10:00
                    carInfo.CarName = reader["CarName"].ToString();
                    carInfo.CarImage = reader["CarImage"].ToString();
                    carInfo.Description = reader["Description"].ToString();
                    carInfo.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    carInfo.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    carInfo.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carInfo.Account_ID = reader["Account_ID"].ToString();
                    carInfo.Color = reader["Color"].ToString();
                    listCar.Add(carInfo);
                }
                con.Close();
                return listCar;
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            }
        }

        /// <summary>
        ///  Hàm 2:  lấy danh sách loại xe. 
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>listCartype</returns>
        public List<CarTypeInfo> getCarTypeInfo(String stringSql)
        {
            try
            {
                List<CarTypeInfo> listCartype = new List<CarTypeInfo>();
                CarTypeInfo cartypeInfo;
                db = new DataAccess();
                con = new SqlConnection(db.ConnectionString());
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    cartypeInfo = new CarTypeInfo();
                    cartypeInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    cartypeInfo.CarTypeName = reader["CarTypeName"].ToString();
                    cartypeInfo.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    cartypeInfo.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    cartypeInfo.Account_ID = reader["Account_ID"].ToString();
                    listCartype.Add(cartypeInfo);
                }
                con.Close();
                return listCartype;
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                con.Close();
                throw;
            }
        }


        public ApiResponse GetCarInfo()
        {
            try

            {

                try
                {
                    string stringSqlGetCarInfo = String.Format(Prototype.SqlCommandStore.uspGetListCar, (int)BookingType.CarType.Delete, (int)BookingType.CarType.Maintenance);
                    string stringSqlGetCarTypeInfo = Prototype.SqlCommandStore.uspGetListCarType;

                    res.CarInfo = getCarInfo(stringSqlGetCarInfo);
                    res.CarTypeInfo = getCarTypeInfo(stringSqlGetCarTypeInfo);
                    return ApiResponse.Success(res); // lấy thành công. 
                }
                catch (BHutechException ex)
                {
                    LogWriter.WriteException(ex);
                    return ApiResponse.Error(107); //Hệ thống không thể kết nối đến Server!!
                }
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                return ApiResponse.Error(106); //Hệ thống có lỗi trong quá trình xử lý!
            }
        }

    }
}
 
