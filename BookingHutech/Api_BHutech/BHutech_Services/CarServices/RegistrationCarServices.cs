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
                // kiểm tra lại profile status 1 lần nữa
                if (!helper.CheckStatusProfileCar(request.Profile_Status))
                {
                    throw new Exception("Profile_Status = " + request.Profile_Status + " != BookingStatus");
                }
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
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng: phòng QT VÀ  BGH
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
                if (request.RegistrationCarID == null && request.Unit_ID == 0) // cấp 3,4 
                {
                    // lấy toàn bộ đơn cấp phát theo trạng thái 1 -> 10
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspManagerGetRegistrationCarAllUnitByProfileStaus, request.ProfileStatus);
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
                }
                else if (request.RegistrationCarID != null && request.ProfileStatus == (int)BookingStatus.Offer || request.ProfileStatus == (int)BookingStatus.DeanVerify || request.ProfileStatus == (int)BookingStatus.DeanNotVerify || request.ProfileStatus == (int)BookingStatus.AdminNotVerify)
                {
                    // xem chi tiết đơn cấp phát có trạng thái chưa duyệt và không duyệt
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspGetDetailRegistrationCarByNotRatify, request.RegistrationCarID, request.ProfileStatus);
                    result.ListRegistrationCar = registrationCarDAO.GetDetailRegistrationByProfileCarNotRatifyDAO(strSQLQuery);
                }
                // Xem chi tiết đơn có trạng thái QT đã duyệt, chờ BGH duyệt, BGH Không duyệt. đang thực hiện, hoàn thành, của khoa/ viện
                else if (request.RegistrationCarID != null && request.ProfileStatus == (int)BookingStatus.AdminVerify || request.ProfileStatus == (int)BookingStatus.WaitingForSchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolNotVerify || request.ProfileStatus == (int)BookingStatus.Processing || request.ProfileStatus == (int)BookingStatus.Finish)
                {
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspGetDetailRegistrationCarByRatify, request.RegistrationCarID, request.ProfileStatus);
                    result.ListRegistrationCar = registrationCarDAO.GetDetailRegistrationByProfileCarRatifyDAO(strSQLQuery);
                }
                // tìm kiếm đơn cấp phát theo trạng thái và Từ ngày - đến ngày
                else if (request.RegistrationCarID == null && request.DateTimeFrom != null && request.DateTimeTo != null && request.ProfileStatus == (int)BookingStatus.AdminVerify || request.ProfileStatus == (int)BookingStatus.WaitingForSchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolNotVerify || request.ProfileStatus == (int)BookingStatus.Processing || request.ProfileStatus == (int)BookingStatus.Finish || request.ProfileStatus == (int)BookingStatus.Offer || request.ProfileStatus == (int)BookingStatus.DeanVerify || request.ProfileStatus == (int)BookingStatus.DeanNotVerify || request.ProfileStatus == (int)BookingStatus.AdminNotVerify)
                {
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspSearchRegisterCar, request.DateTimeFrom, request.DateTimeTo, request.ProfileStatus);
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
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
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng: Trưởng khoa - Thư ký khoa theo đơn vị
        /// Create by Anh.Tran 20/04/2019
        /// </summary>
        /// <param name="UnitGetListRegistrationCarServices"></param>
        /// <returns</returns>
        public GetListRegistrationCarResponseModel UnitGetListRegistrationCarServices(GetListRegistrationCarRequestModel request)
        {

            GetListRegistrationCarResponseModel result = new GetListRegistrationCarResponseModel();
            try
            {
                string strSQLQuery = "";
                if (request.ProfileStatus == 0 && request.RegistrationCarID == null && request.Unit_ID != 0) // cấp 1,2 
                {
                    // Măt định trang chủ ql của khoa/thư ký -   lấy toàn bộ đơn cấp phát theo trạng thái 1 -> 9 và UnitID
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspUnitGetListRegistrationCarByProfileStaus, request.Unit_ID);
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
                }
                else if (request.RegistrationCarID != null && request.Unit_ID != 0 && request.ProfileStatus == (int)BookingStatus.Offer || request.ProfileStatus == (int)BookingStatus.DeanVerify || request.ProfileStatus == (int)BookingStatus.DeanNotVerify || request.ProfileStatus == (int)BookingStatus.AdminNotVerify)
                {
                    // xem chi tiết đơn cấp phát có trạng thái chưa duyệt và không duyệt của khoa/viện
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspUnitGetDetailRegistrationCarByNotRatify, request.RegistrationCarID, request.Unit_ID);
                    result.ListRegistrationCar = registrationCarDAO.GetDetailRegistrationByProfileCarNotRatifyDAO(strSQLQuery);
                }
                   // Xem chi tiết đơn có trạng thái QT đã duyệt, chờ BGH duyệt, BGH Không duyệt. đang thực hiện, hoàn thành, của khoa/ viện
                else if (request.RegistrationCarID != null && request.ProfileStatus == (int)BookingStatus.AdminVerify || request.ProfileStatus == (int)BookingStatus.WaitingForSchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolVerify  || request.ProfileStatus == (int)BookingStatus.SchoolNotVerify || request.ProfileStatus == (int)BookingStatus.Processing || request.ProfileStatus == (int)BookingStatus.Finish)
                {
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspGetDetailRegistrationCarByRatify, request.RegistrationCarID);
                    result.ListRegistrationCar = registrationCarDAO.GetDetailRegistrationByProfileCarRatifyDAO(strSQLQuery);
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
                result.ListCar = carDAO.GetListCarApproveRegistrationCarDAO(uspGetListCarApproveRegistrationCar); //danh sách xe còn hoạt động
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

        /// <summary>
        /// Anh create 19/4/2019. QT Duyệt, không duyệt, BGH Duyệt, BGH không duyệt,  
        /// </summary>
        /// <param name="stringSql"></param>
        public void ManagerUpdateRegistrationCarService(UpdateRegistrationCarStatusRequestModel request)
        {
            try
            {
                Helper helper = new Helper();
                string struspManagerUpdateRegistrationCar = String.Format(Prototype.SqlCommandStore.uspManagerUpdateRegistrationCar);
                // kiểm tra trại thái 
                if (!helper.CheckStatusProfileCar(request.Profile_Status))
                {
                    throw new Exception("Profile_Status = " + request.Profile_Status + " != BookingStatus");
                }
                registrationCarDAO.ManagerUpdateRegistrationCarDAO(struspManagerUpdateRegistrationCar, request);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
        }

        /// <summary>
        ///Tìm kiếm đơn cấp phát -  quản trị - bgh
        /// Create by Anh.Tran 21/04/2019
        /// </summary>
        /// <param name="GetListRegistrationCarServices"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public GetListRegistrationCarResponseModel SearchGetListRegistrationCarServices(GetListRegistrationCarRequestModel request)
        {

            GetListRegistrationCarResponseModel result = new GetListRegistrationCarResponseModel();
            try
            {
                string strSQLQuery = "";
                // tìm kiếm đơn cấp phát theo trạng thái và Từ ngày - đến ngày
                if (request.RegistrationCarID == null && request.DateTimeFrom != null && request.DateTimeTo != null && request.ProfileStatus == (int)BookingStatus.AdminVerify || request.ProfileStatus == (int)BookingStatus.WaitingForSchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolNotVerify || request.ProfileStatus == (int)BookingStatus.Processing || request.ProfileStatus == (int)BookingStatus.Finish || request.ProfileStatus == (int)BookingStatus.Offer || request.ProfileStatus == (int)BookingStatus.DeanVerify || request.ProfileStatus == (int)BookingStatus.DeanNotVerify || request.ProfileStatus == (int)BookingStatus.AdminNotVerify)
                {
                    request.DateTimeFrom = String.Format("{0:yyyy-MM-dd}", request.DateTimeFrom);
                    request.DateTimeTo = String.Format("{0:yyyy-MM-dd}", request.DateTimeTo);
                    strSQLQuery =  Prototype.SqlCommandStore.uspSearchRegisterCar+" '"+ request.DateTimeFrom + "', '" + request.DateTimeTo + "','"+request.ProfileStatus+"' ";
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
                }
                // tìm kiếm theo mã đơn cấp phát
                else if(request.RegistrationCarID != null)
                {
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspSearchRegisterCarByRegistrationCarID, request.RegistrationCarID);
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
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
        ///Tìm kiếm đơn cấp phát cấp khoa-viện
        /// Create by Anh.Tran 21/04/2019
        /// </summary>
        /// <param name="GetListRegistrationCarServices"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        public GetListRegistrationCarResponseModel UnitSearchGetListRegistrationCarServices(GetListRegistrationCarRequestModel request)
        {

            GetListRegistrationCarResponseModel result = new GetListRegistrationCarResponseModel();
            try
            {
                string strSQLQuery = "";
                // tìm kiếm đơn cấp phát theo trạng thái và Từ ngày - đến ngày
                if (request.RegistrationCarID == null && request.Unit_ID != 0 && request.DateTimeFrom != null && request.DateTimeTo != null && request.ProfileStatus == (int)BookingStatus.AdminVerify || request.ProfileStatus == (int)BookingStatus.WaitingForSchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolVerify || request.ProfileStatus == (int)BookingStatus.SchoolNotVerify || request.ProfileStatus == (int)BookingStatus.Processing || request.ProfileStatus == (int)BookingStatus.Finish || request.ProfileStatus == (int)BookingStatus.Offer || request.ProfileStatus == (int)BookingStatus.DeanVerify || request.ProfileStatus == (int)BookingStatus.DeanNotVerify || request.ProfileStatus == (int)BookingStatus.AdminNotVerify)
                {
                    request.DateTimeFrom = String.Format("{0:yyyy-MM-dd}", request.DateTimeFrom);
                    request.DateTimeTo = String.Format("{0:yyyy-MM-dd}", request.DateTimeTo);
                    strSQLQuery = Prototype.SqlCommandStore.uspUnitSearchRegisterCar + " '" + request.DateTimeFrom + "', '" + request.DateTimeTo + "','" + request.ProfileStatus + "', '"+request.Unit_ID+"' ";
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
                }
                // tìm kiếm theo mã đơn cấp phát
                else if (request.RegistrationCarID != null && request.Unit_ID != 0)
                {
                    strSQLQuery = String.Format(Prototype.SqlCommandStore.uspUnitSearchRegisterCarByRegistrationCarID, request.RegistrationCarID, request.Unit_ID);
                    result.ListRegistrationCar = registrationCarDAO.GetListRegistrationCarDAO(strSQLQuery);
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
    }
}