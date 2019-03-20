﻿using BookingHutech.Api_BHutech.BHutech_Services;
using BookingHutech.Api_BHutech.BHutech_Services.CarServices;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Controllers.Api
{
    public class ManagerReportController : ApiController
    {
        ManagerReportServices managerReportServices = new ManagerReportServices();
        Helper helper = new Helper();

        /// <summary>
        /// ReportCost
        /// Mr.Lam 14/3/2019
        /// </summary>
        /// <returns>List ReportCost</returns>
        [HttpGet]
        public ApiResponse ReportCost()
        {
            try
            {
                // kiểm tra quyền, và nguồn gọi. 
                if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
                {
                    try
                    {
                        var Response = managerReportServices.ReportCostServices();
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