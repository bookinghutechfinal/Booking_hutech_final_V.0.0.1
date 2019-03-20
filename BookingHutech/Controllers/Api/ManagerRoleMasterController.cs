using BookingHutech.Api_BHutech.BHutech_Services;
using BookingHutech.Api_BHutech.BHutech_Services.AccountServices;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Controllers.Api
{
    public class ManagerRoleMasterController :ApiController
    {
        /// <summary>
        ///  Anh.Tran Ceate 19/3/2019. Lấy chi tiết những quyền chưa cấp cho account
        /// </summary>
        /// <param name="request">UpdateGroupRoleRequestModel</param>
        /// <returns>ApiResponse</returns>
        [HttpPost]
        public ApiResponse ManagerGetRoleMasterByAccountID(ManagerGetRoleMasterByAccountIDRequestModel request)
        {
            ManagerAccountServices managerAccountServices = new ManagerAccountServices();
            try
            {
                // kiểm tra quyền - và nguồn gọi api của WEB HAY MOBILE. 
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
                            var result = managerAccountServices.ManagerGetRoleMasterByAccountIDServices(request);
                            return ApiResponse.Success(result);
                        }
                        catch // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                        // END: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  

                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall(); // Không có quyền gọi Api. 
                }
            }
            catch (Exception ex)  // thiếu header. 
            {
                LogWriter.WriteException(ex);
                return ApiResponse.ApiNotPermissionCall();
            }
        }

        /// <summary>
        ///  Anh.Tran Ceate 19/3/2019. Cập nhật tên quyền và lấy ds quyền. 
        /// </summary>
        /// <param name="request">UpdateGroupRoleRequestModel</param>
        /// <returns>ApiResponse</returns>
        [HttpPut]
        public ApiResponse ManagerUpdateRoleMaster(ManagerUpdateRoleMasterRequestModel request)
        {
            ManagerAccountServices managerAccountServices = new ManagerAccountServices();
            try
            {
                // kiểm tra quyền - và nguồn gọi api của WEB HAY MOBILE. 
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
                            var result = managerAccountServices.ManagerUpdateRoleMasterServices(request);
                            return ApiResponse.Success(result);
                        }
                        catch // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        {
                            return ApiResponse.Error();
                        }
                        // END: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  

                    }
                    catch// Không thể kiểm tra quyền. 
                    {
                        return ApiResponse.Error();
                    }
                }
                else  // sai header .
                {
                    return ApiResponse.ApiNotPermissionCall(); // Không có quyền gọi Api. 
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