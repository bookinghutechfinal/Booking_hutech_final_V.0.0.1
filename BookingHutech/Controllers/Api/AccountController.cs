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

namespace BookingHutech.Controllers.Api
{
    public class AccountController : ApiController
    {

        CheckPermissions checkPermissions = new CheckPermissions();
        /// <summary>
        /// Anh.Tran: Create 24/1/2019
        /// GetListEmployeeDAL
        /// </summary>
        /// <param name="">ListCarRequestModel</param>
        /// <returns>ApiResponse</returns> 
        [HttpPut]
        public ApiResponse Logout([FromBody] AccountLogoutRequestModel request)
        {
            AccountServices accountServices = new AccountServices();
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
                            accountServices.AccountLogoutServices(request);
                            return ApiResponse.Success();
                        }
                        catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                        { 
                            return ApiResponse.Error();
                        }
                        // END: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  

                    }
                    catch (Exception ex) // Không thể kiểm tra quyền. 
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

        [HttpPost]
        public ApiResponse Login([FromBody] AccountLoginRequestModel request)
        {
            AccountServices accountServices = new AccountServices();
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Kiểm tra UserName, Password
                        if (DataEntity.CheckUserName(request.UserName) == false || DataEntity.CheckUserName(request.Password) == false)
                            return ApiResponse.LoginFail();
                        else
                        {
                            request.Password = EncodePassword.CreateSHA256(request.Password);
                            // Kiểm tra đăng nhập và trả về return code.  
                            var Response = accountServices.AccountLoginServices(request);

                            int Result = DataEntity.CheckAccountLogin(Response);
                            switch (Result)
                            {
                                case 152:
                                    return ApiResponse.LoginFail();
                                case 102:
                                    return ApiResponse.AccountDelete();
                                case 153:
                                    return ApiResponse.Not_Verify();
                                case 135:
                                    return ApiResponse.IsChangePassword(Response);
                                case 1:
                                    return ApiResponse.Success(Response);
                            }
                            return ApiResponse.Error(); // Có lỗi xử lý. 
                        }


                    }
                    catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPatch]
        public ApiResponse ChangePassword([FromBody] AccountChangePasswordRequestModel request)
        {

            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Kiểm tra UserName, Password
                        if (DataEntity.CheckPassWord(request.Password) == false)
                            return ApiResponse.ErrorInputDataEntity();
                        else
                        {
                            request.Password = EncodePassword.CreateSHA256(request.Password);
                            // Kiểm tra đăng nhập và trả về return code.  
                            //// var Response = accountServices.AccountLoginServices(request);

                            // int Result = DataEntity.CheckAccountLogin(Response);
                            // switch (Result)
                            // {
                            //     case 152:
                            //         return ApiResponse.LoginFail();
                            //     case 102:
                            //         return ApiResponse.AccountDelete();
                            //     case 153:
                            //         return ApiResponse.Not_Verify();
                            //     case 135:
                            //         return ApiResponse.IsChangePassword(Response);
                            //     case 1:
                            //         return ApiResponse.Success(Response);
                            // }
                            return ApiResponse.Error(); // Có lỗi xử lý. 
                        }


                    }
                    catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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