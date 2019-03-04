using System;
using System.Web.Http;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.CarServices.CarServices;
using Demo.Api_BHutech.Models.Response;
using System.Net.Http;
using System.Linq;
using BookingHutech.Api_BHutech.BHutech_Services;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.BHutech_Services.AccountServices;

namespace BookingHutech.Controllers.Api
{
    public class AccountController : ApiController
    {


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
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        accountServices.AccountLogoutServices(request);
                        return ApiResponse.Success();
                    }
                    catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
                    {
                        LogWriter.WriteException(ex);
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