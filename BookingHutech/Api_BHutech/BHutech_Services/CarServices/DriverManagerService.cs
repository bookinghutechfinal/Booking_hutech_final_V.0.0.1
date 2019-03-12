using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class DriverManagerService
    {
        ManagerAccountDAO ManagerAccountDAO = new ManagerAccountDAO(); 
        /// <summary>
        /// Anh.Tran: Create 24/1/2019 
        /// Manager Get Account By Account StatusServices
        /// </summary>
        /// <param name="">ManagerGetAccountByAccountStatusRequestModel</param>
        /// <returns>managerGetAccountByAccountStatus</returns> 
        public ManagerGetDriverByAccountStatusResponseModel ManagerGetListDriverByDriverStatusServices()
        {

            ManagerGetDriverByAccountStatusResponseModel managerGetDriver = new ManagerGetDriverByAccountStatusResponseModel();
            try
            {
                string stringSqlManagerGetListDriverByDriverStatus = String.Format(Prototype.SqlCommandStore.uspManagerGetListDriverByDriverStatus, "1");
                managerGetDriver.GetDriverInfo = ManagerAccountDAO.GetDetailAccountByAccountIDDAO(stringSqlManagerGetListDriverByDriverStatus);
                return managerGetDriver;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }
    }
}