﻿using BookingHutech.Api_BHutech.BHutech_Services;
using BookingHutech.Api_BHutech.BHutech_Services.CarServices;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Lib.Helper;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
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
    public class ManagerCostController : ApiController
    {
        CostManagerServices costManagerServices = new CostManagerServices();
        Helper helper = new Helper();

        /// <summary>
        /// GetDetailRepairCost
        /// Mr.Lam 13/3/2019
        /// </summary>
        /// <returns>Detail Repair Cost</returns>
        [HttpPost]
        public ApiResponse GetDetailRepairCost(GetDetailRepairCostRequestModel request)
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
                            var Response = costManagerServices.GetDetailRepairCostServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// GetListRepairCostServices
        /// Mr.Lam 13/3/2019
        /// </summary>
        /// <param name="request">CostsTypeID</param>
        /// <returns>List Cost</returns>
        [HttpPost]
        public ApiResponse GetListCost(GetListCostRequestModel request)
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
                            var Response = costManagerServices.GetListCostServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// GetListCostByCarID
        /// Mr.Lam 1/4/2019
        /// </summary>
        /// <param name="request">CarID</param>
        /// <returns>List Cost</returns>
        [HttpPost]
        public ApiResponse GetListCostByCarID(GetCarInfoRequestModel request)
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
                            var Response = costManagerServices.GetListCostByCarIDServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// GetListCostByAccountCreate
        /// Mr.Lam 8/4/2019
        /// </summary>
        /// <param name="request">GetListCostByAccountCreateRequestModel</param>
        /// <returns>List Cost</returns>
        [HttpPost]
        public ApiResponse GetListCostByAccountCreate(GetListCostByAccountCreateRequestModel request)
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
                            var Response = costManagerServices.GetListCostByAccountCreateServices(request);
                            return ApiResponse.Success(Response);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// UpdateRepairStatus
        /// Mr.Lam 17/4/2019
        /// </summary>
        /// <param name="request">UpdateRepairStatusRequestModel</param>
        [HttpPost]
        public ApiResponse UpdateRepairStatus(UpdateRepairStatusRequestModel request)
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
                            costManagerServices.UpdateRepairStatusServices(request);
                            return ApiResponse.Success();
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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

        ///// <summary>
        ///// AddNewCost
        ///// Mr.Lam 18/4/2019
        ///// </summary>
        ///// <param name="request">UpdateRepairStatusRequestModel</param>
        //[HttpPost]
        //public ApiResponse AddNewCost(AddNewCostRequestModel request)
        //{
        //    try
        //    {
        //        // kiểm tra quyền, và nguồn gọi. 
        //        if (Permissions.CheckAPIRequest(Request.Headers.GetValues(ApiHeaderKey.BHAPIWebCall.ToString()).First()) == (int)ApiRequestType.Web)
        //        {
        //            try
        //            {
        //                // Start: Kiểm tra quyền - session - quyền sử dụng - login - khóa account.  
        //                //JavaScriptSerializer js = new JavaScriptSerializer();
        //                //CookieHeaderValue CookieAccountInfo = Request.Headers.GetCookies("AccountInfoCheckPermissions").FirstOrDefault();
        //                //int Result = checkPermissions.ResponseCheckPermissions(115, CookieAccountInfo);

        //                //switch (Result)
        //                //{
        //                //    case 114:
        //                //        return ApiResponse.LostSession();
        //                //    case 150:
        //                //        return ApiResponse.NotPermission();
        //                //    case 102:
        //                //        return ApiResponse.AccountDelete();
        //                //}
        //                // OK -> Đi tiếp. 
        //                try
        //                {
        //                    int result = costManagerServices.AddNewCostServices(request);
        //                    return ApiResponse.Success(result);
        //                }
        //                catch (Exception ex) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
        //                {
        //                    return ApiResponse.Error();
        //                }
        //            }
        //            catch// Không thể kiểm tra quyền. 
        //            {
        //                return ApiResponse.Error();
        //            }
        //        }
        //        else  // sai header .
        //        {
        //            return ApiResponse.ApiNotPermissionCall();
        //        }
        //    }
        //    catch (Exception ex)  // thiếu header. 
        //    {
        //        LogWriter.WriteException(ex);
        //        return ApiResponse.ApiNotPermissionCall();
        //    }
        //}

        /// <summary>
        /// AddNewDetailCost
        /// Mr.Lam 21/4/2019
        /// </summary>
        /// <param name="request">List AddNewDetailCostRequestModel</param>
        [HttpPost]
        public ApiResponse AddNewDetailCost(List<AddNewDetailCostRequestModel> request)
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
                            int result = costManagerServices.AddNewDetailCostServices(request);
                            return ApiResponse.Success(result);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// UpdateDetailCost
        /// Mr.Lam 22/4/2019
        /// </summary>
        /// <param name="request"> AddNewDetailCostRequestModel</param>
        [HttpPost]
        public ApiResponse UpdateDetailCost(UpdateDetailCostRequestModel request)
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
                            int result = costManagerServices.UpdateDetailCostServices(request);
                            return ApiResponse.Success(result);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
        /// AddNewCost
        /// Mr.Lam 18/4/2019
        /// </summary>
        /// <param name="request">UpdateRepairStatusRequestModel</param>
        [HttpPost]
        public ApiResponse AddNewCosts([FromBody]NewCostRequestModel request)
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
                            int result = costManagerServices.AddNewCostsServices(request);
                            return ApiResponse.Success(result);
                        }
                        catch (Exception ) // Thực hiện gọi hàm truy vấn ở lớp trên bị lỗi. 
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
