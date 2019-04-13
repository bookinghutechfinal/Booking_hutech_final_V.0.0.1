using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class RegistrationCarServices
    {
        RegistrationCarDAO registrationCarDAO = new RegistrationCarDAO();

        /// <summary>
        /// GetRegistrationCarByCarIDServices
        /// Create by Mr.Lam 28/03/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public GetRegistrationCarByCarIDResponseModel GetRegistrationCarByCarIDServices(GetCarInfoRequestModel request)
        {

            GetRegistrationCarByCarIDResponseModel result = new GetRegistrationCarByCarIDResponseModel();
            try
            {
                string uspGetRegistrationCarByCarID = String.Format(Prototype.SqlCommandStore.uspGetRegistrationCarByCarID, request.CarID, (Int32)BookingStatus.Finish);
                result.GetRegistrationCarByCarID = registrationCarDAO.GetRegistrationCarDAO(uspGetRegistrationCarByCarID);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// GetRegistrationCarByDriverIDServices
        /// Create by Mr.Lam 9/4/2019
        /// </summary>
        /// <param name="GetRegistrationCarByDriverIDRequestModel"></param>
        /// <returns>List RegistrationCar by DriverID</returns>
        public GetRegistrationCarByCarIDResponseModel GetRegistrationCarByDriverIDServices(GetRegistrationCarByDriverIDRequestModel request)
        {

            GetRegistrationCarByCarIDResponseModel result = new GetRegistrationCarByCarIDResponseModel();
            try
            {
                string datefrom = String.Format("{0:yyyy-MM-dd}", request.DateFrom);
                string dateto = String.Format("{0:yyyy-MM-dd}", request.DateTo);
                result.GetRegistrationCarByCarID = registrationCarDAO.GetRegistrationCarDAO("uspGetRegistrationCarByDriverID '"+ request.DriverID +"',"+request.Profile_Status1 + "," + request.Profile_Status2 + "," + request.Profile_Status3 + ",'" + datefrom+"','" + dateto+ "'");
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// UpdateRegistrationCarStatusServices
        /// Create by Mr.Lam 12/4/2019
        /// </summary>
        /// <param name="UpdateRegistrationCarStatusServices"></param>
        /// <returns>UpdateSuccessResponseModel</returns>
        public UpdateSuccessResponseModel UpdateRegistrationCarStatusServices(UpdateRegistrationCarStatusRequestModel request)
        {
            UpdateSuccessResponseModel result = new UpdateSuccessResponseModel();
            try
            {
                string uspUpdateRegistrationCarStatus = String.Format(Prototype.SqlCommandStore.uspUpdateRegistrationCarStatus, request.RegistrationCarID, request.Profile_Status, request.DistanceTo, request.DistanceBack,request.CarID);
                result = registrationCarDAO.UpdateRegistrationCarStatusDAO(uspUpdateRegistrationCarStatus);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }
    }
}