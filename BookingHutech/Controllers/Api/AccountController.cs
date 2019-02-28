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
        [HttpPost]
        public ApiResponse Login([FromBody] AccountLoginRequestModel request)
        {
            CarServices carServices = new CarServices();
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        // Kiểm tra UserName, Password
                        //if (DataEntity.CheckDataLogin(request.UserName) == false && DataEntity.CheckDataLogin(request.Password) == false)
                        //    return ApiResponse.ErrorInputDataEntity(); 
                        //else
                        //{
                        //    request.Password = EncodePassword.CreateSHA256(request.Password); 
                        //    //var Response = carServices.GetListCarDAL(request);
                        //    return ApiResponse.Success();
                        //} 

                        request.Password = EncodePassword.CreateSHA256(request.Password);
                        //var Response = carServices.GetListCarDAL(request);
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
 
    }
}