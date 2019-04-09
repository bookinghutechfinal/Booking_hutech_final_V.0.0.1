using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Lib;
using System.Web.Http;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.BookingCar;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Api_BHutech.CarServices.CarServices
{
    public class CarServices  
    {
        CarDAO carDAO = new CarDAO();

        /// <summary>
        /// Mr.Lam 8/3/2019
        /// GetListCar + List cartype
        /// </summary>
        /// <param name="">GetListCarRequestModel</param>
        /// <returns>ListCarResponseModel</returns> 
        public ListCarResponseModel GetListCarServices(GetListCarRequestModel request)
        {

            ListCarResponseModel result = new ListCarResponseModel();
            try
            { 
                string uspGetListCar = String.Format(Prototype.SqlCommandStore.uspGetListCar, request.CarStatus1, request.CarStatus2);
                string stringSqlGetCarTypeInfo = Prototype.SqlCommandStore.uspGetListCarType;
                result.ListCarType = carDAO.GetListCarTypeDAO(stringSqlGetCarTypeInfo);
                result.ListCar = carDAO.GetListCarDAO(uspGetListCar);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
 
        }
        

        /// <summary>
        /// GetListCarByCarTypeID
        /// Mr.Lam 8/3/2019
        /// </summary>
        /// <param name="request">CarTypeID</param>
        /// <returns>List car</returns>
        public ListCarResponseModel GetListCarByCarTypeIDServices(SearchCarRequestModel request)
        {

            ListCarResponseModel result = new ListCarResponseModel();
            try
            {
                string uspGetListCarByCarTypeID = String.Format(Prototype.SqlCommandStore.uspGetListCarByCarTypeID, 1000,1001,request.CarTypeID);
                result.ListCar = carDAO.GetListCarDAO(uspGetListCarByCarTypeID);
                return result;

            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

        /// <summary>
        /// Mr.Lam 27/3/2019
        /// Get car info
        /// </summary>
        /// <param name="">GetCarInfoRequestModel</param>
        /// <returns>CarInfo</returns> 
        public List<CarInfo> GetCarInfoServices(GetCarInfoRequestModel request)
        {
            List<CarInfo> result = new List<CarInfo>();
            ListCarResponseModel listCar = new ListCarResponseModel();
            try
            {
                string uspGetCarInfo = String.Format(Prototype.SqlCommandStore.uspGetCarInfo, request.CarID);
                result = carDAO.GetListCarDAO(uspGetCarInfo);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// Mr.Lam 1/4/2019
        /// UpdateCarStatusServices
        /// </summary>
        /// <param name="">CarID, CarStatus</param>
        /// <returns></returns> 
        public UpdateCarStatusResponseModel UpdateCarStatusServices(UpdateCarStatusRequestModel request)
        {
            try
            {
                ListCarStatus Status = new ListCarStatus();
                if (Array.IndexOf(Status.listCarStatus, request.CarStatus) < 0)
                {
                    LogWriter.WriteLogMsg("Mã trạng thái không đúng");
                    throw new Exception();
                }
                UpdateCarStatusResponseModel response = new UpdateCarStatusResponseModel();
                string uspUpdateCarStatus = String.Format(Prototype.SqlCommandStore.uspUpdateCarStatus);
                response = carDAO.UpdateCarStatusDAO(uspUpdateCarStatus, request);
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Mr.Lam 8/4/2019
        /// Get car info by AccountID and AssignStatus
        /// </summary>
        /// <param name="">GetCarInfoByAccountIDRequestModel</param>
        /// <returns>CarInfo</returns> 
        public List<CarInfo> GetCarInfoByAccountIDServices(GetCarInfoByAccountIDRequestModel request)
        {
            List<CarInfo> result = new List<CarInfo>();
            ListCarResponseModel listCar = new ListCarResponseModel();
            try
            {
                string uspGetCarInfoByAccountID = String.Format(Prototype.SqlCommandStore.uspGetCarInfoByAccountID, request.Account_ID,(int)BookingType.AssignStatus.active);
                result = carDAO.GetListCarDAO(uspGetCarInfoByAccountID);
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