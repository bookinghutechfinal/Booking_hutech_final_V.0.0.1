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
using BookingHutech.Api_BHutech.Lib.Helper;

namespace BookingHutech.Api_BHutech.CarServices.CarServices
{
    public class CarServices  
    {
        CarDAO carDAO = new CarDAO();
        Helper helper = new Helper();
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
        /// Mr.Lam 15/4/2019
        /// List cartype
        /// </summary>
        /// <returns>ListCarType</returns> 
        public List<CarTypeInfo> GetListCarTypeServices()
        {
            List<CarTypeInfo> result = new List<CarTypeInfo>();
            string uspGetListCarType = Prototype.SqlCommandStore.uspGetListCarType;
            result = carDAO.GetListCarTypeDAO(uspGetListCarType);
            return result;
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

        /// <summary>
        /// UpdateCarInfoServices
        /// Create by Mr.Lam 17/4/2019
        /// </summary>
        /// <param name="UpdateCarInfoRequestModel"></param>
        public void UpdateCarInfoServices(UpdateCarInfoRequestModel request)
        {
            try
            {
                string uspUpdateCarInfo = String.Format(Prototype.SqlCommandStore.uspUpdateCarInfo);
                carDAO.UpdateCarInfoDAO(uspUpdateCarInfo, request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        } 
        /// <summary>
        /// Thêm mới xe
        /// Create by Anh.tran 26/4/2019
        /// </summary>
        /// <param name="UpdateCarInfoRequestModel"></param>
        public void CreateNewCarServices(CreateNewCarRequestModel request)
        {
            try
            {  
                string fileName = "Car" + helper.CreateID() + ".png";
                request.CarImage = UploadFile.UploadImage(request.CarImage, fileName);
                string uspCreateNewCar = String.Format(Prototype.SqlCommandStore.uspCreateNewCar);
                carDAO.CreateNewCarDAO(uspCreateNewCar, request);
            }
            catch (Exception ex)
            {
                UploadFile.DeleteImage(request.CarImage);
                LogWriter.WriteException(ex);
                throw;
            }
        }
        /// <summary>
        /// Thêm mới xe
        /// Create by Anh.tran 26/4/2019
        /// </summary>
        /// <param name="UpdateCarInfoRequestModel"></param>
        public void CreateNewCarTypeServices(CreateNewCarTypeRequestModel request)
        {
            try
            {
               
              //  string uspCreateNewCar = String.Format(Prototype.SqlCommandStore.uspCreateNewCarType;
                string uspCreateNewCarType = String.Format(Prototype.SqlCommandStore.uspCreateNewCarType, request.CarTypeName, request.FullNameUpdate);
                carDAO.CarTyperDAO(uspCreateNewCarType);
            }
            catch (Exception ex)
            { 
                LogWriter.WriteException(ex);
                throw;
            }
        } 
        /// <summary>
        /// Thêm mới xe
        /// Create by Anh.tran 26/4/2019
        /// </summary>
        /// <param name="UpdateCarInfoRequestModel"></param>
        public void UpdateCarTypeServices(CreateNewCarTypeRequestModel request)
        {
            try
            {
               
              //  string uspCreateNewCar = String.Format(Prototype.SqlCommandStore.uspCreateNewCarType;
                string uspUpdateCarType = String.Format(Prototype.SqlCommandStore.uspUpdateCarType, request.CarTypeID,request.CarTypeName, request.FullNameUpdate);
                carDAO.CarTyperDAO(uspUpdateCarType);
            }
            catch (Exception ex)
            { 
                LogWriter.WriteException(ex);
                throw;
            }
        }
    }
}