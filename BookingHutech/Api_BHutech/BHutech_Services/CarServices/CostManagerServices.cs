using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class CostManagerServices
    {
        ManagerCostDAO managerCostDAO = new ManagerCostDAO();

        /// <summary>
        /// GetListRepairCostServices
        /// Mr.Lam 11/3/2019
        /// </summary>
        /// <returns>List RepairInfo</returns>
        public ListRepairCostResponseModel GetListRepairCostServices()
        {
            ListRepairCostResponseModel result = new ListRepairCostResponseModel();
            try
            {
                string uspGetListRepairCost = Prototype.SqlCommandStore.uspGetListRepairCost;
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO(uspGetListRepairCost);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        public ListRepairCostResponseModel GetDetailRepairCostServices(GetDetailRepairCostRequestModel request)
        {
            ListRepairCostResponseModel result = new ListRepairCostResponseModel();
            try
            {
                string uspGetDetailRepairCost = String.Format(Prototype.SqlCommandStore.uspGetDetailRepairCost, request.RepairID);
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO(uspGetDetailRepairCost);
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