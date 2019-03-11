using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class CostManagerServices
    {
        CostManagerDAO costManagerDAO = new CostManagerDAO();

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
                result.ListRepairCost = costManagerDAO.GetListRepairCostDAO(uspGetListRepairCost);
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