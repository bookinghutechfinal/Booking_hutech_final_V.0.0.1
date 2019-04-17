using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.BookingCar;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class AssignDriverServices
    {
        AssignDriverDAO assignDriverDAO = new AssignDriverDAO();

        /// <summary>
        /// GetListAssignDriverService
        /// Mr.Lam 16/4/2019
        /// </summary>
        /// <returns>List AssignDriver</returns>
        public List<AssignDriverInfo> GetListAssignDriverService()
        {
            List<AssignDriverInfo> result = new List<AssignDriverInfo>();
            try
            {
                string uspGetListAssignDriver = String.Format(Prototype.SqlCommandStore.uspGetListAssignDriver);
                result = assignDriverDAO.GetListAssignDriverDAO(uspGetListAssignDriver);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// GetListAssignDriverService
        /// Mr.Lam 16/4/2019
        /// </summary>
        /// <returns>List AssignDriver</returns>
        public List<AssignDriverInfo> GetDriverManageCarServices(GetCarInfoRequestModel request)
        {
            List<AssignDriverInfo> result = new List<AssignDriverInfo>();
            try
            {
                string uspGetDriverManageCar = String.Format(Prototype.SqlCommandStore.uspGetDriverManageCar,request.CarID);
                result = assignDriverDAO.GetListAssignDriverDAO(uspGetDriverManageCar);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// AssignDriverManagerServices
        /// Mr.Lam 17/4/2019
        /// </summary>
        /// <param name="request">AssignDriverManagerRequestModel</param>
        public void AssignDriverManagerServices(AssignDriverManagerRequestModel request)
        {
            try
            {
                string uspAssignDriverManager = String.Format(Prototype.SqlCommandStore.uspAssignDriverManager, request.Account_ID, request.CarID, request.FullNameUpdate);
                assignDriverDAO.AssignDriverManagerDAO(uspAssignDriverManager);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// GetListAssignedServices
        /// Mr.Lam 16/4/2019
        /// </summary>
        /// <returns>List AssignDriver</returns>
        public List<AssignDriverInfo> GetListAssignedServices()
        {
            List<AssignDriverInfo> result = new List<AssignDriverInfo>();
            try
            {
                string uspGetListAssigned = String.Format(Prototype.SqlCommandStore.uspGetListAssigned);
                result = assignDriverDAO.GetListAssignDriverDAO(uspGetListAssigned);
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