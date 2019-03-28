using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.BookingCar;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
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
                    registrationCarInfo.RegistrationCarID= reader["RegistrationCarID"].ToString();
                    registrationCarInfo.Account_ID= reader["Account_ID"].ToString();
                    registrationCarInfo.UnitRequest= reader["UnitRequest"].ToString();
                    registrationCarInfo.Reason= reader["Reason"].ToString();
                    registrationCarInfo.Leader= reader["Leader"].ToString();
                    registrationCarInfo.DateTimeFrom = reader["DateTimeFrom"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeFrom"].ToString());
                    registrationCarInfo.DateTimeTo = reader["DateTimeTo"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["DateTimeTo"].ToString());
                    registrationCarInfo.NumberPeople = Int32.Parse(reader["NumberPeople"].ToString());
                    registrationCarInfo.RouteTo = reader["RouteTo"].ToString();
                    registrationCarInfo.RouteBack = reader["RouteBack"].ToString();
                    registrationCarInfo.DistanceTo = Int32.Parse(reader["DistanceTo"].ToString());
                    registrationCarInfo.DistanceBack = Int32.Parse(reader["DistanceBack"].ToString());
                    registrationCarInfo.DistanceTotal = Int32.Parse(reader["DistanceTotal"].ToString());
                    registrationCarInfo.Profile_Status = Int32.Parse(reader["Profile_Status"].ToString());
                    registrationCarInfo.CreatDay = reader["CreatDay"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["CreatDay"].ToString());
                    //registrationCarInfo.ReceiveDate = reader["ReceiveDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["ReceiveDate"].ToString());
                    registrationCarInfo.LastModifiedDate = reader["LastModifiedDate"].ToString() == "" ? (DateTime?)null : DateTime.Parse(reader["LastModifiedDate"].ToString());
                    registrationCarInfo.UserNameUpdate = reader["UserNameUpdate"].ToString();
                    registrationCarInfo.CarTypeID = Int32.Parse(reader["CarTypeID"].ToString());
                    registrationCarInfo.CarID = Int32.Parse(reader["CarID"].ToString());
                    registrationCarInfo.DriverID = reader["DriverID"].ToString();
                    registrationCarInfo.FullName= reader["FullName"].ToString();
                    registrationCarInfo.CarNo= reader["CarNo"].ToString();

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
    }
}