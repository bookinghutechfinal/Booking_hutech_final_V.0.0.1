using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Models.BookingCar;

namespace BookingHutech.Api_BHutech.BHutech_Services.CarServices
{
    public class RegistrationCarServices
    {
        RegistrationCarDAO registrationCarDAO = new RegistrationCarDAO();
        CarDAO carDAO = new CarDAO();

        /// <summary>
        /// GetRegistrationCarByCarIDServices
        /// Create by Mr.Lam 28/03/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public GetRegistrationCarByCarIDResponseModel GetRegistrationCarByCarIDServices(GetCarInfoRequestModel request)
        {

            GetRegistrationCarByCarIDResponseModel result = new GetRegistrationCarByCarIDResponseModel();
            try
            {
                string uspGetRegistrationCarByCarID = String.Format(Prototype.SqlCommandStore.uspGetRegistrationCarByCarID, request.CarID, (Int32)BookingStatus.Finish);
                result.GetRegistrationCarByCarID = registrationCarDAO.GetRegistrationCarDAO(uspGetRegistrationCarByCarID);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// GetRegistrationCarByDriverIDServices
        /// Create by Mr.Lam 9/4/2019
        /// </summary>
        /// <param name="GetRegistrationCarByDriverIDRequestModel"></param>
        /// <returns>List RegistrationCar by DriverID</returns>
        public GetRegistrationCarByCarIDResponseModel GetRegistrationCarByDriverIDServices(GetRegistrationCarByDriverIDRequestModel request)
        {

            GetRegistrationCarByCarIDResponseModel result = new GetRegistrationCarByCarIDResponseModel();
            try
            {
                string datefrom = String.Format("{0:yyyy-MM-dd}", request.DateFrom);
                string dateto = String.Format("{0:yyyy-MM-dd}", request.DateTo);
                result.GetRegistrationCarByCarID = registrationCarDAO.GetRegistrationCarDAO("uspGetRegistrationCarByDriverID '" + request.DriverID + "'," + request.Profile_Status1 + "," + request.Profile_Status2 + "," + request.Profile_Status3 + ",'" + datefrom + "','" + dateto + "'");
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// UpdateRegistrationCarStatusServices
        /// Create by Mr.Lam 12/4/2019
        /// </summary>
        /// <param name="UpdateRegistrationCarStatusServices"></param>
        /// <returns>UpdateSuccessResponseModel</returns>
        public void UpdateRegistrationCarStatusServices(UpdateRegistrationCarStatusRequestModel request)
        {
            UpdateSuccessResponseModel result = new UpdateSuccessResponseModel();
            try
            {
                string uspUpdateRegistrationCarStatus = String.Format(Prototype.SqlCommandStore.uspUpdateRegistrationCarStatus);
                registrationCarDAO.UpdateRegistrationCarStatusDAO(uspUpdateRegistrationCarStatus, request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }
        /// <summary>
        /// Anh.Trần Crate 14/1/2019. Tạo mới đơn cấp phát xe
        /// </summary>
        /// <param name="stringSql"></param>
        public void CreateNewRegistrationCarService(CreateNewRegistrationCarRequestModel request)
        {
            try
            {
                Helper helper = new Helper();
                request.RegistrationCarID = helper.CreateID();
                string uspCreateNewRegistrationCar = String.Format(Prototype.SqlCommandStore.uspCreateNewRegistrationCar);
                registrationCarDAO.CreateNewRegistrationCarDAO(uspCreateNewRegistrationCar, request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng chung cho cấp 1 thư ký khoa,2 trưởng khoa, vvv,3,4
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="GetListRegistrationCarServices"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public GetListRegistrationCarResponseModel ManagerGetListRegistrationCarServices(GetListRegistrationCarRequestModel request)
        {

            GetListRegistrationCarResponseModel result = new GetListRegistrationCarResponseModel();
            try
            {
                string strSQLQuery = "";
                if (request.ProfileStatus !=0 && request.RegistrationCarID == null && request.Unit_ID == 0) // cấp 3,4 
                {
                    // lấy toàn bộ đơn cấp phát theo trạng thái 1 -> 10
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspManagerGetRegistrationCarAllUnitByProfileStaus, request.ProfileStatus);
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
                }
                else if (request.RegistrationCarID !=null && request.ProfileStatus == (int) BookingStatus.Offer || request.ProfileStatus == (int)BookingStatus.DeanVerify || request.ProfileStatus == (int)BookingStatus.DeanNotVerify || request.ProfileStatus == (int)BookingStatus.AdminNotVerify) 
                {
                    // xem chi tiết đơn cấp phát có trạng thái chưa duyệt và không duyệt
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspGetDetailRegistrationCarByNotRatify, request.RegistrationCarID);
                    result.ListRegistrationCar = registrationCarDAO.GetDetailRegistrationByProfileCarNotRatifyDAO(strSQLQuery);    
                }
                else
                {
                    return result;
                }

                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public List<CarInfo> SearchApproveRegistrationCarServices(SearchApproveRegistrationCarRequestModel request)
        {
            Helper helper = new Helper(); 
            SearchApproveRegistrationCar result = new SearchApproveRegistrationCar();
            try
            {
                // lấy danh sách xe hoạt động
                // Lấy danh sách đơn cấp phát  đã duyệt
                string uspGetListCarApproveRegistrationCar = String.Format(Prototype.SqlCommandStore.uspGetListCarApproveRegistrationCar); 
                string uspGetListRegistrationApproveRegistrationCar = String.Format(Prototype.SqlCommandStore.uspGetListRegistrationApproveRegistrationCar); //request.ProfileStatus
                result.ListCar = carDAO.GetListCarDAO(uspGetListCarApproveRegistrationCar); //danh sách xe còn hoạt động
                result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(uspGetListRegistrationApproveRegistrationCar); // đơn cấp phát đã duyệt, chờ trường duyệt, chờ đi.


                // 
                return helper.SearchApproveRegistrationCar(request, result); 
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }
    }
}