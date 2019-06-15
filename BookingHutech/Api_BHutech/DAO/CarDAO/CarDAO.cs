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
        //static SqlDataAdapter adap;

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
                    if (reader["CarTypeID"] != DBNull.Value)
                    {
                        carInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    }

                    carInfo.CarTypeName = reader["CarTypeName"].ToString();
                    carInfo.CarImage = reader["CarImage"].ToString();
                    if (reader["CarStatus"] != DBNull.Value)
                    {
                        carInfo.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    }
                    carInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    carInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    carInfo.Expires = reader["Expires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["Expires"].ToString());
                    carInfo.InsuranceExpires = reader["InsuranceExpires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["InsuranceExpires"].ToString());


                    result.Add(carInfo);
                }
                con.Close();
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.MyWriteLogData("GetListCarDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
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
                    if (reader["CarTypeID"] != DBNull.Value)
                    {
                        carTypeInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    }
                    carTypeInfo.CarTypeName = reader["CarTypeName"].ToString();
                    if (reader["CreateDate"] != DBNull.Value)
                    {
                        carTypeInfo.CreateDate = DateTime.Parse(reader["CreateDate"].ToString());
                    }
                    if (reader["LastModifiedDate"] != DBNull.Value)
                    {
                        carTypeInfo.LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString());
                    }
                    carTypeInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    result.Add(carTypeInfo);
                }
                con.Close();
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.MyWriteLogData("GetListCarTypeDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
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
                res.ReturnCode = UpdateCarStatusResponseType.Fail;
                if (cmd.Parameters["@Return"].Value != DBNull.Value)
                {
                    res.ReturnCode = (UpdateCarStatusResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                }
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
                LogWriter.MyWriteLogData("UpdateCarStatusDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
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
            cmd.Parameters.Add("@CarName", SqlDbType.NVarChar, 50).Value = request.CarName;
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

                response.ReturnCode = GroupRoleResponseType.Fail;
                if (cmd.Parameters["@Return"].Value != DBNull.Value)
                {
                    response.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                }
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
                LogWriter.MyWriteLogData("UpdateCarStatusDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }
        /// <summary>
        /// Thêm mới xe
        /// Create by Anh.Tran 26/4/2019
        /// </summary>
        /// <param name="UpdateCarInfoRequestModel"></param>
        public void CreateNewCarDAO(String sqlStore, CreateNewCarRequestModel request)
        {
            UpdateSuccessResponseModel response = new UpdateSuccessResponseModel();

            //
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@CarName", SqlDbType.NVarChar, 50).Value = request.CarName;
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
                response.ReturnCode = GroupRoleResponseType.Fail; 
                if(cmd.Parameters["@Return"].Value != DBNull.Value)
                {
                    response.ReturnCode = (GroupRoleResponseType)Convert.ToInt32(cmd.Parameters["@Return"].Value);
                } 
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
                LogWriter.MyWriteLogData("CreateNewCarDAO", sqlStore, request.ToString(), null, ex, "Exc SP = " + sqlStore + " fail");
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }


        /// <summary>
        /// Anh.Create 18/4/2019
        /// </summary>
        /// <param name="stringSql">stringSql</param>
        /// <returns>list CarInfo</returns> 
        public List<CarInfo> GetListCarApproveRegistrationCarDAO(String stringSql)
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
                    if (reader["CarID"] != DBNull.Value)
                    {
                        carInfo.CarID = Int32.Parse(reader["CarID"].ToString());
                    } 
                    carInfo.CarName = reader["CarName"].ToString();
                    carInfo.CarNo = reader["CarNo"].ToString();
                    if (reader["CarTypeID"] != DBNull.Value)
                    {
                        carInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    } 
                    carInfo.CarTypeName = reader["CarTypeName"].ToString();
                    carInfo.CarImage = reader["CarImage"].ToString();
                    if (reader["CarStatus"] != DBNull.Value)
                    {
                        carInfo.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    } 
                    carInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    carInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    carInfo.Expires = reader["Expires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["Expires"].ToString());
                    carInfo.InsuranceExpires = reader["InsuranceExpires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["InsuranceExpires"].ToString());
                    carInfo.DriverID = reader["DriverID"].ToString();
                    carInfo.FullNameDriver = reader["FullNameDriver"].ToString();

                    result.Add(carInfo);
                }
                reader.NextResult();
                while (reader.Read())
                {
                    carInfo = new CarInfo();
                    if (reader["CarName"] != DBNull.Value)
                    {
                        carInfo.CarName = reader["CarName"].ToString();
                    } 
                    carInfo.CarNo = reader["CarNo"].ToString();
                    if (reader["CarTypeID"] != DBNull.Value)
                    {
                        carInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    } 
                    carInfo.CarTypeName = reader["CarTypeName"].ToString();
                    carInfo.CarImage = reader["CarImage"].ToString();
                    if (reader["CarStatus"] != DBNull.Value)
                    {
                        carInfo.CarStatus = Int32.Parse(reader["CarStatus"].ToString());
                    } 
                    carInfo.CreateDate = reader["CreateDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreateDate"].ToString());
                    carInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    carInfo.FullNameUpdate = reader["FullNameUpdate"].ToString();
                    carInfo.Expires = reader["Expires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["Expires"].ToString());
                    carInfo.InsuranceExpires = reader["InsuranceExpires"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["InsuranceExpires"].ToString());
                    carInfo.DriverID = reader["DriverID"].ToString();
                    carInfo.FullNameDriver = reader["FullNameDriver"].ToString();

                    result.Add(carInfo);
                }

                con.Close();
                return result;
            }
            catch (Exception ex)
            {

                LogWriter.MyWriteLogData("GetListCarApproveRegistrationCarDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                con.Close();
                throw;
            }
        }

        /// <summary>
        /// CarTyperDAO
        /// Anh.Tran 1/5/2019
        /// </summary>
        public void CarTyperDAO(string stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                int a = cmd.ExecuteNonQuery();
                if (a == 1)
                {
                    LogWriter.MyWriteLogData("CarTyperDAO", stringSql, null, null, null, "Exc SP = " + stringSql + " fail");
                    con.Close();
                    throw new Exception();
                }
                con.Close();
            }
            catch (Exception ex)
            { 
                LogWriter.MyWriteLogData("CarTyperDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                con.Close();
                throw;
            }
        }

        /// <summary>
        ///  uspRegistrationCarByCarIDReport. 
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>GetReportDetailCarResponseModel</returns>
        public List<GetReportDetailCarResponseModel> RegistrationCarByCarIDReportDAO(String stringSql)
        {
            try
            {
                List<GetReportDetailCarResponseModel> result = new List<GetReportDetailCarResponseModel>();
                GetReportDetailCarResponseModel getReportDetailCarResponseModel;
                db = new DataAccess();
                con = new SqlConnection(db.ConnectionString());
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    getReportDetailCarResponseModel = new GetReportDetailCarResponseModel();
                    getReportDetailCarResponseModel.SumKM = reader["SumKM"]?.ToString() != "" ? Int32.Parse(reader["SumKM"].ToString()) : 0;
                    getReportDetailCarResponseModel.SumKMMonth = reader["SumKMMonth"]?.ToString() != "" ? Int32.Parse(reader["SumKMMonth"].ToString()) : 0;
                    getReportDetailCarResponseModel.MonthDone = reader["MonthDone"]?.ToString() != "" ? Int32.Parse(reader["MonthDone"].ToString()) : -1;
                    getReportDetailCarResponseModel.YearDone = reader["YearDone"]?.ToString() != "" ? Int32.Parse(reader["YearDone"].ToString()) : -1;
                    result.Add(getReportDetailCarResponseModel);
                }
                reader.NextResult();
                while (reader.Read())
                {
                    getReportDetailCarResponseModel = new GetReportDetailCarResponseModel();
                    getReportDetailCarResponseModel.SumKM = reader["SumKM"]?.ToString() != "" ? Int32.Parse(reader["SumKM"].ToString()) : 0;
                    getReportDetailCarResponseModel.SumKMMonth = reader["SumKMMonth"]?.ToString() != "" ? Int32.Parse(reader["SumKMMonth"].ToString()) : 0;
                    getReportDetailCarResponseModel.MonthDone = reader["MonthDone"]?.ToString() != "" ? Int32.Parse(reader["MonthDone"].ToString()) : -1;
                    getReportDetailCarResponseModel.YearDone = reader["YearDone"]?.ToString() != "" ? Int32.Parse(reader["YearDone"].ToString()) : -1;
                    result.Add(getReportDetailCarResponseModel);
                }
                con.Close();
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.MyWriteLogData("RegistrationCarByCarIDReportDAO", stringSql, null, null, ex, "Exc SP = " + stringSql + " fail");
                con.Close();
                throw;
            }
        }
    }
}

