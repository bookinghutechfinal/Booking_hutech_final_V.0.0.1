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
using System.Data;
using BookingHutech.Api_BHutech.Prototype;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class CarDAO
    {
        static DataAccess db;
        static SqlConnection con; 
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        /// <summary>
        /// GetListCarDAO
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
                    carInfo.CarName = reader["CarName"].ToString();
                    carInfo.CarNo = reader["CarNo"].ToString();
                    carInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    carInfo.CarTypeName = reader["CarTypeName"].ToString();
                    carInfo.CarImage = reader["CarImage"].ToString();
                    carInfo.CarStatus =  Int32.Parse(reader["CarStatus"].ToString());
                    carInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    carInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() ==""? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    carInfo.Expires = reader["Expires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["Expires"].ToString());
                    carInfo.InsuranceExpires = reader["InsuranceExpires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["InsuranceExpires"].ToString());


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
                    carTypeInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();
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
        /// <summary>
        /// UpdateCarStatusDAO
        /// Mr.Lam
        /// </summary>
        /// <param name="sqlStore"></param>
        /// <param name="UpdateCarStatusRequestModel"></param>
        public UpdateCarStatusResponseModel UpdateCarStatusDAO(String sqlStore, UpdateCarStatusRequestModel request)
        {
            UpdateCarStatusResponseModel res = new UpdateCarStatusResponseModel();
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CarID", SqlDbType.Int).Value = request.CarID;
            cmd.Parameters.Add("@CarStatus", SqlDbType.Int).Value = request.CarStatus;

            cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
                res.ReturnCode = (UpdateCarStatusResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                if (res.ReturnCode != UpdateCarStatusResponseType.Success)
                {
                    LogWriter.WriteLogMsg(string.Format(SqlCommandStore.ExcuteSpFail, sqlStore, res.ReturnCode, (int)res.ReturnCode));
                    throw new Exception();
                }
                return res;
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.WriteException(ex);
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

        /// <summary>
        /// UpdateCarInfoDAO
        /// Create by Mr.Lam 17/4/2019
        /// </summary>
        /// <param name="UpdateCarInfoRequestModel"></param>
        public void UpdateCarInfoDAO(String sqlStore, UpdateCarInfoRequestModel request)
        {
            UpdateSuccessResponseModel response = new UpdateSuccessResponseModel();

            //
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@CarID", SqlDbType.Int).Value = request.CarID;
            cmd.Parameters.Add("@CarName", SqlDbType.NVarChar,50).Value = request.CarName;
            cmd.Parameters.Add("@CarNo", SqlDbType.NVarChar, 50).Value = request.CarNo;
            cmd.Parameters.Add("@CarTypeID", SqlDbType.Int).Value = request.CarTypeID;
            cmd.Parameters.Add("@CarImage", SqlDbType.NVarChar, 50).Value = request.CarImage;
            cmd.Parameters.Add("@Expires", SqlDbType.DateTime).Value = request.Expires;
            cmd.Parameters.Add("@InsuranceExpires", SqlDbType.DateTime).Value = request.InsuranceExpires;
            cmd.Parameters.Add("@FullNameUpdate", SqlDbType.NVarChar, 50).Value = request.FullNameUpdate;

            cmd.Parameters.Add("@Return", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
                response.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                if (response.ReturnCode != GroupRoleResponseType.Success)
                {
                    LogWriter.WriteLogMsg(string.Format(SqlCommandStore.ExcuteSpFail, sqlStore, response.ReturnCode, response.ReturnCode));
                    throw new Exception();
                }

                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
                LogWriter.WriteException(ex);
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }
    }
}
 
