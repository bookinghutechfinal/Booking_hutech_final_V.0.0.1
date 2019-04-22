using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class ManagerReportServices
    {
        ManagerReportDAO managerReportDAO = new ManagerReportDAO();

        /// <summary>
        /// ReportCostServices
        /// Mr.Lam 14/3/2019
        /// </summary>
        /// <returns>List ReportCost</returns>
        public ReportCostResponseModel ReportCostServices(ReportCostRequestModel request)
        {
            ReportCostResponseModel result = new ReportCostResponseModel();
            try
            {
                string uspCostReport = String.Format(Prototype.SqlCommandStore.uspCostReport,request.Month,request.Year,request.ReportType,request.YearQuarter,request.DateFrom,request.DateTo);
                result.ListReportCost = managerReportDAO.ReportCostDAO(uspCostReport);
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