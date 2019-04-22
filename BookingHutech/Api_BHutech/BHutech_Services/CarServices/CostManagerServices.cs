using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class CostManagerServices
    {
        ManagerCostDAO managerCostDAO = new ManagerCostDAO();
        Helper helper = new Helper();
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
                string uspGetListCost = String.Format(Prototype.SqlCommandStore.uspGetListCost, request.CostsTypeID,request.DateFrom,request.DateTo,request.CarID,request.RepairStatus,request.RepairStatus1, request.RepairStatus2, request.RepairStatus3, request.Limit);
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
                string uspGetListCostByAccountCreate = String.Format(Prototype.SqlCommandStore.uspGetListCostByAccountCreate,request.AccountCreate,request.RepairStatus,request.RepairStatus1,request.RepairStatus2,request.RepairStatus3,request.DateFrom,request.DateTo);
                result.ListRepairCost = managerCostDAO.GetListRepairCostDAO(uspGetListCostByAccountCreate);
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
                string uspUpdateRepairStatus = String.Format(Prototype.SqlCommandStore.uspUpdateRepairStatus,request.RepairID,request.RepairStatus,request.FullNameUpdate,request.Note);
                managerCostDAO.UpdateRepairStatusDAO(uspUpdateRepairStatus);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// AddNewCostServices
        /// Mr.Lam 18/4/2019
        /// </summary>
        /// <param name="request">AddNewCostRequestModel</param>
        public int AddNewCostServices(AddNewCostRequestModel request)
        {
            try
            {
                if (request.RepairID==null)
                    request.RepairID = helper.CreateID();
                string uspAddNewCost = String.Format(Prototype.SqlCommandStore.uspAddNewCost, request.RepairID, request.Car_ID, request.CostsTypeID, request.RepairAddres, request.Note, request.ImagerBill, request.CreateDate, request.FullNameUpdate, request.RepairStatus, request.AccountCreate, request.Content, request.Quantity, request.TotalMoney,request.AddType);
                int result = managerCostDAO.AddNewCostDAO(uspAddNewCost);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// AddNewCostServices
        /// Mr.Lam 18/4/2019
        /// </summary>
        /// <param name="request">AddNewCostRequestModel</param>
        public int AddNewDetailCostServices(List<AddNewDetailCostRequestModel> request)
        {
            try
            {
                string repairID = request[0].RepairID;
                string data = "";
                for(int i=0;i<request.Count;i++) {
                    if(i== request.Count - 1)
                        data = data + "(" + "'" + request[i].RepairID + "'" + "," + "N'" + request[i].Content + "'" + "," + request[i].Quantity + "," + request[i].TotalMoney + ")";
                    else
                        data = data + "(" + "'" + request[i].RepairID + "'" + "," + "N'" + request[i].Content + "'" + "," + request[i].Quantity + "," + request[i].TotalMoney + "),";
                }
                string stringSql = "begin try"
                                    + " begin transaction"
                                    + " update Repair set RepairStatus = 2 where RepairID = "
                                    + "'" + repairID + "'"
                                    + " insert into RepairDetail (RepairID, Content, Quantity, TotalMoney)"
                                    + " values " +
                                    data
                                    + " commit"
                                    + " end try"
                                    + " begin catch"
	                                + " rollback"
                                    + " end catch";
                int result = managerCostDAO.AddNewCostDAO(stringSql);
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