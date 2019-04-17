using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.BookingCar;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using BookingHutech.Api_BHutech.Prototype;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.DAO.CarDAO
{
    public class RegistrationCarDAO
    {
        static DataAccess db;
        static SqlConnection con;
        static SqlCommand cmd;
        static SqlDataAdapter adap;

        /// <summary>
        /// GetRegistrationCarDAO
        /// Create by Mr.Lam 28/03/2019
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public List<GetRegistrationCarByCarID> GetRegistrationCarDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<GetRegistrationCarByCarID> result = new List<GetRegistrationCarByCarID>();
            GetRegistrationCarByCarID registrationCarInfo;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    registrationCarInfo = new GetRegistrationCarByCarID();
                    registrationCarInfo.RegistrationCarID = reader["RegistrationCarID"].ToString();
                    registrationCarInfo.Account_ID = reader["Account_ID"].ToString();
                    registrationCarInfo.UnitRequest = reader["UnitRequest"].ToString();
                    registrationCarInfo.Reason = reader["Reason"].ToString();
                    registrationCarInfo.Leader = reader["Leader"].ToString();
                    registrationCarInfo.DateTimeFrom = reader["DateTimeFrom"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeFrom"].ToString());
                    registrationCarInfo.DateTimeTo = reader["DateTimeTo"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeTo"].ToString());
                    registrationCarInfo.NumberPeople = Int32.Parse(reader["NumberPeople"].ToString());
                    registrationCarInfo.RouteTo = reader["RouteTo"].ToString();
                    registrationCarInfo.RouteBack = reader["RouteBack"].ToString();
                    registrationCarInfo.DistanceTo = reader["DistanceTo"].ToString() == "" ? (int?)null : Int32.Parse(reader["DistanceTo"].ToString());
                    registrationCarInfo.DistanceBack = reader["DistanceBack"].ToString() == "" ? (int?)null : Int32.Parse(reader["DistanceBack"].ToString());
                    registrationCarInfo.DistanceTotal = reader["DistanceTotal"].ToString() == "" ? (int?)null : Int32.Parse(reader["DistanceTotal"].ToString());
                    registrationCarInfo.Profile_Status = Int32.Parse(reader["Profile_Status"].ToString());
                    registrationCarInfo.CreatDay = reader["CreatDay"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreatDay"].ToString());
                    //registrationCarInfo.ReceiveDate = reader["ReceiveDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["ReceiveDate"].ToString());
                    registrationCarInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    registrationCarInfo.UserNameUpdate = reader["UserNameUpdate"].ToString();
                    registrationCarInfo.CarTypeID = reader["CarTypeID"].ToString() == "" ? (int?)null : Int32.Parse(reader["CarTypeID"].ToString());
                    registrationCarInfo.CarID = reader["CarID"].ToString() == "" ? (int?)null : Int32.Parse(reader["CarID"].ToString());
                    registrationCarInfo.DriverID = reader["DriverID"].ToString() == "" ? (string)null : reader["DriverID"].ToString();
                    registrationCarInfo.FullName = reader["FullName"].ToString();
                    registrationCarInfo.CarNo = reader["CarNo"].ToString();

                    result.Add(registrationCarInfo);
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
        /// UpdateRegistrationCarStatus
        /// Create by Mr.Lam 12/4/2019
        /// </summary>
        /// <param name="stringSql"></param>
        public void UpdateRegistrationCarStatusDAO(String sqlStore, UpdateRegistrationCarStatusRequestModel request)
        {
            UpdateSuccessResponseModel response = new UpdateSuccessResponseModel();

            //
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@RegistrationCarID", SqlDbType.VarChar, 10).Value = request.RegistrationCarID;
            cmd.Parameters.Add("@Profile_Status", SqlDbType.Int).Value = request.Profile_Status;
            cmd.Parameters.Add("@DistanceTo", SqlDbType.Int).Value = request.DistanceTo;
            cmd.Parameters.Add("@DistanceBack", SqlDbType.Int).Value = request.DistanceBack;
            cmd.Parameters.Add("@CarID", SqlDbType.Int).Value = request.CarID;

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

        /// <summary>
        /// Anh.Trần Crate 14/1/2019. Tạo mới đơn cấp phát
        /// </summary>
        /// <param name="stringSql"></param>
        public void CreateNewRegistrationCarDAO(String sqlStore, CreateNewRegistrationCarRequestModel request)
        {

            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            cmd = new SqlCommand(sqlStore, con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@RegistrationCarID", SqlDbType.VarChar, 10).Value = request.RegistrationCarID;
            cmd.Parameters.Add("@Unit_ID", SqlDbType.Int).Value = request.Unit_ID;
            cmd.Parameters.Add("@Account_ID", SqlDbType.VarChar, 10).Value = request.Account_ID;
            cmd.Parameters.Add("@UnitRequest", SqlDbType.NVarChar, 200).Value = request.UnitRequest;
            cmd.Parameters.Add("@Reason", SqlDbType.NVarChar, 200).Value = request.Reason;
            cmd.Parameters.Add("@Leader", SqlDbType.NVarChar, 50).Value = request.Leader;
            cmd.Parameters.Add("@EmailLeader", SqlDbType.VarChar, 100).Value = request.EmailLeader;
            cmd.Parameters.Add("@NumberPhoneLeader", SqlDbType.Char, 12).Value = request.NumberPhoneLeader;
            cmd.Parameters.Add("@DateTimeFrom", SqlDbType.DateTime).Value = request.DateTimeFrom;
            cmd.Parameters.Add("@DateTimeTo", SqlDbType.DateTime).Value = request.DateTimeTo;
            cmd.Parameters.Add("@NumberPeople", SqlDbType.Int).Value = request.NumberPeople;
            cmd.Parameters.Add("@RouteTo", SqlDbType.NText).Value = request.RouteTo;
            cmd.Parameters.Add("@RouteBack", SqlDbType.NText).Value = request.RouteBack;
            cmd.Parameters.Add("@PlanDistanceTo", SqlDbType.Int).Value = request.PlanDistanceTo;
            cmd.Parameters.Add("@PlanDistanceBack", SqlDbType.Int).Value = request.PlanDistanceBack;
            cmd.Parameters.Add("@Profile_Status", SqlDbType.Int).Value = request.Profile_Status;
            cmd.Parameters.Add("@CarTypeNameRequest", SqlDbType.NVarChar, 200).Value = request.CarTypeNameRequest;
            try
            {
                if (cmd.Connection.State == ConnectionState.Closed)
                {
                    cmd.Connection.Open();
                }
                cmd.ExecuteNonQuery();
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

        /// <summary>
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng chung cho cấp 1 thư ký khoa,2 trưởng khoa, vvv,3,4
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public List<GetListRegistrationCar> GetListRegistrationCarDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<GetListRegistrationCar> result = new List<GetListRegistrationCar>();
            GetListRegistrationCar getListRegistration;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    getListRegistration = new GetListRegistrationCar();
                    getListRegistration.RegistrationCarID = reader["RegistrationCarID"].ToString();
                    getListRegistration.UnitName = reader["UnitName"].ToString(); 
                    getListRegistration.CreatDay = reader["CreatDay"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreatDay"].ToString());
                    getListRegistration.DateTimeFrom = reader["DateTimeFrom"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeFrom"].ToString());
                    getListRegistration.DateTimeTo = reader["DateTimeTo"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeTo"].ToString()); 
                    getListRegistration.RouteTo = reader["RouteTo"].ToString();
                    getListRegistration.RouteBack = reader["RouteBack"].ToString();  
                    getListRegistration.Profile_Status = Int32.Parse(reader["Profile_Status"].ToString());
                    // getListRegistration.CarID = Int32.Parse(reader["CarID"].ToString());                    
                    getListRegistration.CarID = reader["CarID"].ToString() == "" ? 0 : Int32.Parse(reader["CarID"].ToString());                   
                    result.Add(getListRegistration);
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
        /// TH1: GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng chưa hoặc không duyệt. chung cho cấp 1 thư ký khoa,2 trưởng khoa,3,4
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="stringSql"></param>
        /// <returns>Detail registration</returns>
        public List<GetListRegistrationCar> GetDetailRegistrationByProfileCarNotRatifyDAO(String stringSql)
        {
            db = new DataAccess();
            con = new SqlConnection(db.ConnectionString());
            List<GetListRegistrationCar> result = new List<GetListRegistrationCar>();
            GetListRegistrationCar getDetailRegistration;
            try
            {
                con.Open();
                cmd = new SqlCommand(stringSql, con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    getDetailRegistration = new GetListRegistrationCar();
                    getDetailRegistration.RegistrationCarID = reader["RegistrationCarID"].ToString();
                    getDetailRegistration.UnitName = reader["UnitName"].ToString();
                    getDetailRegistration.Manager = reader["Manager"].ToString();
                    getDetailRegistration.NumberPhoneManager = reader["NumberPhoneManager"].ToString();
                    getDetailRegistration.EmailManager = reader["EmailManager"].ToString();
                    getDetailRegistration.CreatDay = reader["CreatDay"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreatDay"].ToString());
                    getDetailRegistration.DateTimeFrom = reader["DateTimeFrom"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeFrom"].ToString());
                    getDetailRegistration.DateTimeTo = reader["DateTimeTo"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeTo"].ToString());
                    getDetailRegistration.RouteTo = reader["RouteTo"].ToString();
                    getDetailRegistration.RouteBack = reader["RouteBack"].ToString();
                    getDetailRegistration.Profile_Status = Int32.Parse(reader["Profile_Status"].ToString());
                    getDetailRegistration.UnitRequest = reader["UnitRequest"].ToString();
                    getDetailRegistration.Reason = reader["Reason"].ToString();
                    getDetailRegistration.Leader = reader["Leader"].ToString();
                    getDetailRegistration.EmailLeader = reader["EmailLeader"].ToString();
                    getDetailRegistration.NumberPhoneLeader = reader["NumberPhoneLeader"].ToString();
                    getDetailRegistration.NumberPeople = Int32.Parse(reader["NumberPeople"].ToString()); 
                    getDetailRegistration.PlanDistanceTo = Int32.Parse(reader["PlanDistanceTo"].ToString()); 
                    getDetailRegistration.PlanDistanceBack = Int32.Parse(reader["PlanDistanceBack"].ToString()); 
                    getDetailRegistration.Profile_Status = Int32.Parse(reader["Profile_Status"].ToString()); 
                    getDetailRegistration.CarTypeNameRequest = reader["CarTypeNameRequest"].ToString(); 
                    result.Add(getDetailRegistration);
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