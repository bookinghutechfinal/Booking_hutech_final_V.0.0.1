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
    public class ProfileAccountController : ApiController
    {

        CheckPermissions checkPermissions = new CheckPermissions();
        

        /// <summary>
        /// /// Anh.Trần Create 8/4/2019 Cập nhật tài khoản
        /// </summary>
        /// <param name="request">ManagerUpdateAccountRequestModel</param>
        /// <returns>ApiResponse</returns>
        [HttpPost]
        public ApiResponse EditProfiAccount([FromBody] EditProfileAccountRequestModel request)
        {
            ManagerAccountServices managerAccountServices = new ManagerAccountServices();
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
                        managerAccountServices.EditProfileAccountServices(request);
                        return ApiResponse.Success();

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