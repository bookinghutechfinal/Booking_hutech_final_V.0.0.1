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
                string uspGetRegistrationCarByCarID = String.Format(Prototype.SqlCommandStore.uspGetRegistrationCarByCarID, request.CarID, (Int32)BookingStatus.finish);
                result.GetRegistrationCarByCarID = registrationCarDAO.GetRegistrationCarDAO(uspGetRegistrationCarByCarID);
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