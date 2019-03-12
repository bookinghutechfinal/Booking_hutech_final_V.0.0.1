using System;
using System.Web.Http;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.CarServices.CarServices;
using System.Net.Http;
using System.Linq;
using BookingHutech.Api_BHutech.BHutech_Services;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;

namespace BookingHutech.Controllers.Api
{
    public class CarController : ApiController
    {
        CarServices carServices = new CarServices();
        Helper helpe = new Helper();

        /// <summary>
        /// Mr.Lam 8/3/2019
        /// GetListCar
        /// </summary>
        /// <param name=""></param>
        /// <returns>ApiResponse</returns> 
        [HttpGet]
        public ApiResponse GetListCar()
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        var Response = carServices.GetListCarServices();
                        return ApiResponse.Success(Response);
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
        /// GetListCarByCartypeID
        /// Mr.Lam 8/3/2019
        /// </summary>
        /// <param name="request">CarTypeID</param>
        /// <returns>ApiResponse</returns>
        [HttpPost]
        public ApiResponse GetListCarByCartypeID([FromBody]SearchCarRequestModel request)
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        var Response = carServices.GetListCarByCarTypeIDServices(request);
                        return ApiResponse.Success(Response);
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