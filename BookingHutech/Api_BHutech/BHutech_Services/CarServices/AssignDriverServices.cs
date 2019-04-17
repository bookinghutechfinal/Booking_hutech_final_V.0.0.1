﻿using BookingHutech.Api_BHutech.DAO.CarDAO;
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
    }
}