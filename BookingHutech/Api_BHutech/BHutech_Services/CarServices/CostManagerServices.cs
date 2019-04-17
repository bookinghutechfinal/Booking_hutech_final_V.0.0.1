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
                string uspGetListCost = String.Format(Prototype.SqlCommandStore.uspGetListCost, request.CostsTypeID,request.DateFrom,request.DateTo,request.CarID,request.RepairStatus,request.RepairStatus1,request.Limit);
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
        /// GetListCostByCarIDServices
        /// Mr.Lam 1/4/2019
        /// </summary>
        /// <param name="request">CarID</param>
        /// <returns>List Cost</returns>
        public ListRepairCostResponseModel GetListCostByCarIDServices(GetCarInfoRequestModel request)
        {
            ListRepairCostResponseModel result = new ListRepairCostResponseModel();
            try
            {
                string uspGetListCostByCarID = String.Format(Prototype.SqlCommandStore.uspGetListCostByCarID, request.CarID);
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO(uspGetListCostByCarID);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// GetListCostByAccountCreateServices
        /// Mr.Lam 8/4/2019
        /// </summary>
        /// <param name="request">GetListCostByAccountCreateRequestModel</param>
        /// <returns>List Cost</returns>
        public ListRepairCostResponseModel GetListCostByAccountCreateServices(GetListCostByAccountCreateRequestModel request)
        {
            ListRepairCostResponseModel result = new ListRepairCostResponseModel();
            try
            {
                string datefrom = String.Format("{0:yyyy-MM-dd}", request.DateFrom);
                string dateto = String.Format("{0:yyyy-MM-dd}", request.DateTo);
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO("uspGetListCostByAccountCreate '" + request.AccountCreate + "'," + request.RepairStatus1 + "," + request.RepairStatus2 + ",'" + datefrom + "','" + dateto + "'");
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// UpdateRepairStatusServices
        /// Mr.Lam 17/4/2019
        /// </summary>
        /// <param name="request">UpdateRepairStatusRequestModel</param>
        public void UpdateRepairStatusServices(UpdateRepairStatusRequestModel request)
        {
            try
            {
                string uspUpdateRepairStatus = String.Format(Prototype.SqlCommandStore.uspUpdateRepairStatus,request.RepairID,request.RepairStatus,request.FullNameUpdate);
                managerCostDAO.UpdateRepairStatusDAO(uspUpdateRepairStatus);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }
    }
}