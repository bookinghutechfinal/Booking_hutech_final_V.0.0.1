using System;
using System.Web.Http;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.CarServices.CarServices;
using Demo.Api_BHutech.Models.Response;
using System.Net.Http;
using System.Linq;
using BookingHutech.Api_BHutech.BHutech_Services;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Lib.Utils;

namespace BookingHutech.Controllers.Api
{
    public class CarController : ApiController
    {
        EmployeeDAO bookingCar = new EmployeeDAO();
        Helper helpe = new Helper();

        /// <summary>
        /// Anh.Tran: Create 24/1/2019
        /// GetListEmployeeDAL
        /// </summary>
        /// <param name="">ListCarRequestModel</param>
        /// <returns>ApiResponse</returns> 
        [HttpPost]
        public ApiResponse GetListCar([FromBody] ListCarRequestModel request)
        {
            CarServices carServices = new CarServices();
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        var Response = carServices.GetListCarDAL(request);
                        return ApiResponse.Success(Response);
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

        /// <summary>
        /// GetListCar
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Return Data + Return Code</returns>
        [HttpGet]
        public ApiResponse GetListCar()
        {
            try
            {
                //LogWriter.WriteException("Account\t:\tGet danh sách xe");
                //// gọi hàm kiểm tra login trước 


                var result = bookingCar.GetCarInfo();
                // Kiểm tra để trả về cho người dùng.  
                return ApiResponse.Success(result);
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                return ApiResponse.Error(106);  // Có lỗi trong quá trình xử lý
                // ghi log nhá. 
            }
        }


    }
}