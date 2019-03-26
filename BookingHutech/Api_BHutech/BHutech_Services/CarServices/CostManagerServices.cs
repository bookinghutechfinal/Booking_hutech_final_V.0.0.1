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

        /// <summary>
        /// GetDetailRepairCostServices
        /// Mr.Lam 13/3/2019
        /// </summary>
        /// <param name="request">RepairID</param>
        /// <returns>List detail repair cost</returns>
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

        /// <summary>
        /// GetListRepairCostServices
        /// Mr.Lam 13/3/2019
        /// </summary>
        /// <param name="request">CostsTypeID</param>
        /// <returns>List Cost</returns>
        public ListRepairCostResponseModel GetListCostServices(GetListCostRequestModel request)
        {
            ListRepairCostResponseModel result = new ListRepairCostResponseModel();
            try
            {
                string uspGetListCost = String.Format(Prototype.SqlCommandStore.uspGetListCost, request.CostsTypeID);
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO(uspGetListCost);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }
        /// <summary>
        /// SearchCostServices
        /// Mr.Lam 25/3/2019
        /// </summary>
        /// <param name="request">CarID, Date_from, Date_to, CostsTypeID</param>
        /// <returns>List Cost</returns>
        public ListRepairCostResponseModel SearchCostServices(SearchCostRequestModel request)
        {
            ListRepairCostResponseModel result = new ListRepairCostResponseModel();
            try
            {
                string condition1 = "";
                string condition2 = "";
                string condition3 = "";

                if (request.CarID != 0)
                    condition1 = "Car_ID = "+request.CarID+ " and ";
                if (request.Date_from != null)
                    condition2 = "'" + request.Date_from + "'< CreateDate and ";
                if (request.Date_to != null)
                    condition3 = "'" + request.Date_to + "'> CreateDate and ";

                string sql = "select * from viewManagerCost where "+ condition1 + condition2 + condition3 + "CostsTypeID = " + request.CostsTypeID;
                
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO(sql);
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