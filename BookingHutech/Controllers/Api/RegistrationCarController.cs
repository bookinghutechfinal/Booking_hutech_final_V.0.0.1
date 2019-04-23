using BookingHutech.Api_BHutech.BHutech_Services;
using BookingHutech.Api_BHutech.BHutech_Services.CarServices;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using BookingHutech.Api_BHutech.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Script.Serialization;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Controllers.Api
{
    public class RegistrationCarController : ApiController
    {
        RegistrationCarServices registrationCarServices = new RegistrationCarServices();
        Helper helper = new Helper();
        CheckPermissions checkPermissions = new CheckPermissions();
        /// <summary>
        /// GetRegistrationCarByCarID
        /// Create by Mr.Lam 28/03/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        [HttpPost]
        public ApiResponse GetRegistrationCarByCarID(GetCarInfoRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        //JavaScriptSerializer js = new JavaScriptSerializer();
                        //CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        //int Result = checkPermissions.ResponseCheckPermissions(115, CookieAccountInfo);

                        //switch (Result)
                        //{
                        //    case 114:
                        //        return ApiResponse.LostSession();
                        //    case 150:
                        //        return ApiResponse.NotPermission();
                        //    case 102:
                        //        return ApiResponse.AccountDelete();
                        //}
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.GetRegistrationCarByCarIDServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// GetRegistrationCarByDriverID
        /// Create by Mr.Lam 9/4/2019
        /// </summary>
        /// <param name="GetRegistrationCarByDriverIDRequestModel"></param>
        /// <returns>List RegistrationCar by DriverID</returns>
        [HttpPost]
        public ApiResponse GetRegistrationCarByDriverID(GetRegistrationCarByDriverIDRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        //JavaScriptSerializer js = new JavaScriptSerializer();
                        //CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        //int Result = checkPermissions.ResponseCheckPermissions(115, CookieAccountInfo);

                        //switch (Result)
                        //{
                        //    case 114:
                        //        return ApiResponse.LostSession();
                        //    case 150:
                        //        return ApiResponse.NotPermission();
                        //    case 102:
                        //        return ApiResponse.AccountDelete();
                        //}
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.GetRegistrationCarByDriverIDServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// UpdateRegistrationCarStatus
        /// Create by Mr.Lam 12/4/2019
        /// </summary>
        /// <param name="UpdateRegistrationCarStatusServices"></param>
        /// <returns>UpdateSuccessResponseModel</returns>
        [HttpPost]
        public ApiResponse UpdateRegistrationCarStatus(UpdateRegistrationCarStatusRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        //JavaScriptSerializer js = new JavaScriptSerializer();
                        //CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        //int Result = checkPermissions.ResponseCheckPermissions(115, CookieAccountInfo);

                        //switch (Result)
                        //{
                        //    case 114:
                        //        return ApiResponse.LostSession();
                        //    case 150:
                        //        return ApiResponse.NotPermission();
                        //    case 102:
                        //        return ApiResponse.AccountDelete();
                        //}
                        // OK -> Đi tiếp.
                        try
                        {
                            registrationCarServices.UpdateRegistrationCarStatusServices(request);
                            return ApiResponse.Success();
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Values_Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// Anh.Trần Crate 14/1/2019. Tạo mới đơn cấp phát xe
        /// </summary>
        /// <param name="CreateNewRegistrationCarRequestModel">CreateNewRegistrationCarRequestModel</param>
        [HttpPut]
        public ApiResponse CreateNewRegistrationCar([FromBody]CreateNewRegistrationCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        int Result = checkPermissions.ResponseCheckPermissions(908, CookieAccountInfo);

                        switch (Result)
                        {
                            case 114:
                                return ApiResponse.LostSession();
                            case 150:
                                return ApiResponse.NotPermission();
                            case 102:
                                return ApiResponse.AccountDelete();
                        }
                       // /./OK->Đi tiếp.
                        try
                        {
                            registrationCarServices.CreateNewRegistrationCarService(request);
                            return ApiResponse.Success();
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// Chỉ dành cho phòng quản trị  
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        [HttpPost]
        public ApiResponse ManagerGetListRegistrationCarServices([FromBody]GetListRegistrationCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        int Result = checkPermissions.ResponseCheckPermissions(900, CookieAccountInfo);

                        switch (Result)
                        {
                            case 114:
                                return ApiResponse.LostSession();
                            case 150:
                                return ApiResponse.NotPermission();
                            case 102:
                                return ApiResponse.AccountDelete();
                        }
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.ManagerGetListRegistrationCarServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// Chỉ dành cho Kho/ viện và thử ký khoa // 300
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        [HttpPut]
        public ApiResponse UnitGetListRegistrationCar([FromBody]GetListRegistrationCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        int Result = checkPermissions.ResponseCheckPermissions(904, CookieAccountInfo);

                        switch (Result)
                        {
                            case 114:
                                return ApiResponse.LostSession();
                            case 150:
                                return ApiResponse.NotPermission();
                            case 102:
                                return ApiResponse.AccountDelete();
                        }
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.UnitGetListRegistrationCarServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

         

        /// <summary>
        /// Anh create 19/4/2019. QT Duyệt, không duyệt, BGH Duyệt, BGH không duyệt,  
        /// </summary>
        /// <param name="stringSql"></param>
        [HttpPut]
        public ApiResponse ManagerUpdateRegistrationCar(UpdateRegistrationCarStatusRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        //JavaScriptSerializer js = new JavaScriptSerializer();
                        //CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        //int Result = checkPermissions.ResponseCheckPermissions(400, CookieAccountInfo);

                        //switch (Result)
                        //{
                        //    case 114:
                        //        return ApiResponse.LostSession();
                        //    case 150:
                        //        return ApiResponse.NotPermission();
                        //    case 102:
                        //        return ApiResponse.AccountDelete();
                        //}
                        // OK -> Đi tiếp.
                        try
                        {
                            registrationCarServices.ManagerUpdateRegistrationCarService(request);
                            return ApiResponse.Success();
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }


        /// <summary>
        /// Chỉ dành cho quản trị viên và bgh
        /// Tìm kiếm xe trống để cấp
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        [HttpPost]
        public ApiResponse SearchApproveRegistrationCar([FromBody] SearchApproveRegistrationCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        int Result = checkPermissions.ResponseCheckPermissions(903, CookieAccountInfo);

                        switch (Result)
                        {
                            case 114:
                                return ApiResponse.LostSession();
                            case 150:
                                return ApiResponse.NotPermission();
                            case 102:
                                return ApiResponse.AccountDelete();
                        }
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.SearchApproveRegistrationCarServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// Anh create 19/4/2019. Khoa duyệt, hủy  
        /// </summary>
        /// <param name="stringSql"></param>
        [HttpPut]
        public ApiResponse UnitUpdateRegistrationCar(UpdateRegistrationCarStatusRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        //JavaScriptSerializer js = new JavaScriptSerializer();
                        //CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        //int Result = checkPermissions.ResponseCheckPermissions(300, CookieAccountInfo);

                        //switch (Result)
                        //{
                        //    case 114:
                        //        return ApiResponse.LostSession();
                        //    case 150:
                        //        return ApiResponse.NotPermission();
                        //    case 102:
                        //        return ApiResponse.AccountDelete();
                        //}
                        // OK -> Đi tiếp.
                        try
                        {
                            registrationCarServices.ManagerUpdateRegistrationCarService(request);
                            return ApiResponse.Success();
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        /// Chỉ dành cho phòng quản trị, bgh 
        /// GetListRegistrationCarDAO. Lấy danh sách đơn cấp phát dùng
        /// Create by Anh.Tran 15/04/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        [HttpPost]
        public ApiResponse SearchGetListRegistrationCar([FromBody]GetListRegistrationCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        int Result = checkPermissions.ResponseCheckPermissions(900, CookieAccountInfo);

                        switch (Result)
                        {
                            case 114:
                                return ApiResponse.LostSession();
                            case 150:
                                return ApiResponse.NotPermission();
                            case 102:
                                return ApiResponse.AccountDelete();
                        }
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.SearchGetListRegistrationCarServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }
        /// <summary>
        /// Chỉ dành cho khoa/viện
        /// UnitSearchGetListRegistrationCar. Lấy danh sách đơn cấp phát dùng
        /// Create by Anh.Tran 22/04/2019
        /// </summary>
        /// <param name="GetCarInfoRequestModel"></param>
        /// <returns>List RegistrationCar by CarID</returns>
        [HttpPut]
        public ApiResponse UnitSearchGetListRegistrationCar([FromBody]GetListRegistrationCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
                        int Result = checkPermissions.ResponseCheckPermissions(904, CookieAccountInfo);

                        switch (Result)
                        {
                            case 114:
                                return ApiResponse.LostSession();
                            case 150:
                                return ApiResponse.NotPermission();
                            case 102:
                                return ApiResponse.AccountDelete();
                        }
                        // OK -> Đi tiếp.
                        try
                        {
                            var Response = registrationCarServices.UnitSearchGetListRegistrationCarServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall();
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }
    }
}
