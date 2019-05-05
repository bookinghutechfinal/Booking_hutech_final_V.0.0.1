using System;
using System.Web.Http;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.CarServices.CarServices;
using System.Net.Http;
using System.Linq;
using BookingHutech.Api_BHutech.BHutech_Services;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.BHutech_Services.AccountServices;
using System.Web.Script.Serialization;
using System.Net.Http.Headers;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using System.Collections.Generic;

namespace BookingHutech.Controllers.Api
{
    public class ManagerAccountController : ApiController
    {
        ManagerAccountServices managerAccountServices = new ManagerAccountServices();
        AccountServices accountServices= new AccountServices(); 

        /// <summary>
        /// Anh.Tran: Create 10/3/2019
        /// ManagerGetAccountByAccountStatus: Lấy danh sách tài khoản theo loại tài khoản or trạng thái 
        /// </summary>
        /// <param name="">ManagerGetAccountByAccountStatusRequestModel</param>
        /// <returns>ApiResponse</returns> 
        [HttpPost]
        public ApiResponse ManagerGetAccountByAccountStatusAccountType([FromBody] ManagerGetAccountByAccountStatusRequestModel request)
        {
            
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
                            var result  =  managerAccountServices.ManagerGetAccountByAccountStatusAccountTypeServices(request);
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
        /// Anh.Tran: Create 10/3/2019
        /// Manager Get Detail AccountBy AccountID
        /// </summary>
        /// <param name="">ManagerGetDetailAccountByAccountIDRequestModel</param>
        /// <returns>ApiResponse</returns> 
        [HttpPut]
        public ApiResponse ManagerGetDetailAccountByAccountID([FromBody] ManagerGetDetailAccountByAccountIDRequestModel request)
        {

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
                            var result = managerAccountServices.ManagerGetDetailAccountByAccountIDServices(request);
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
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public ApiResponse ManagerCreateNewAccount([FromBody] AddNewAccountRequestModel request)
        {

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
                        request.createNewAccountRequestModel.Password = EncodePassword.CreateSHA256(request.createNewAccountRequestModel.Password);
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
                            var response = accountServices.ManagerCreateNewAccountServices(request);
                            return ApiResponse.Success(response);
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
        /// Anh.Tran: Create 23/4/2019
        /// Lấy danh sách duyền chưa được phân cho account
        /// </summary>
        /// <param name="">ManagerGetDetailAccountByAccountIDRequestModel</param>
        /// <returns>ApiResponse</returns> 
        [HttpPut]
        public ApiResponse ManagerGetDetailRoleAccountByAccountID([FromBody] ManagerGetRoleMasterByAccountIDRequestModel request)
        {

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
        /// UpdateRole
        /// Mr.Lam 24/4/2019
        /// </summary>
        /// <param name="request">list UpdateRoleRequestModel</param>
        [HttpPost]
        public ApiResponse UpdateRole(List<UpdateRoleRequestModel> request)
        {

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
                            var result = managerAccountServices.UpdateRoleServices(request);
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
        /// DeleteRole
        /// Mr.Lam 28/4/2019
        /// </summary>
        /// <param name="request">list DeleteRoleRequestModel</param>
        [HttpPost]
        public ApiResponse DeleteRole(DeleteRoleRequestModel request)
        {

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
                            var result = managerAccountServices.DeleteRoleServices(request);
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