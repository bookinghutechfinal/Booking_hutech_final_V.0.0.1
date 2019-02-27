using BookingHutech.Api_BHutech.Lib.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response
{
    public class ApiResponse
    {
        public int ReturnCode { set; get; }
        public object Data { set; get; }
        public string Message { get; set; }



        public static ApiResponse AccountDelete(int ReturnCode = (int)BHutechExceptionType.ACCOUNTDELETE)
        {
            return new ApiResponse()
            {
                ReturnCode = ReturnCode
            };
        }
        public static ApiResponse NotSession(int ReturnCode = (int)BHutechExceptionType.NotSession)
        {
            return new ApiResponse()
            {
                ReturnCode = ReturnCode
            };
        }
        public static ApiResponse IsChangePassword(int ReturnCode = (int)BHutechExceptionType.ISCHANGEPASSWORD)
        {
            return new ApiResponse()
            {
                ReturnCode = ReturnCode
            };
        }

        public static ApiResponse NotPermission(int ReturnCode = (int)BHutechExceptionType.NOTPERMISSION)
        {
            return new ApiResponse()
            {
                ReturnCode = ReturnCode
            };
        }
        public static ApiResponse ApiNotPermissionCall(int ReturnCode = (int)BHutechExceptionType.APINOTPERMISSIONCALL)
        {
            return new ApiResponse()
            {
                Message = "Sai header. Bạn không có quyền gọi api này.",
                Data = null,
                ReturnCode = ReturnCode,
            };
        }




        // hàm return data. 
        public static ApiResponse data(object Data = null)
        {
            return new ApiResponse()
            {
                Data = Data,
            };
        }

        public static ApiResponse Success(object Data = null)
        {
            return new ApiResponse()
            {
                Data = Data,
                ReturnCode = (int)BHutechExceptionType.SUCCESS
            };
        }

        public static ApiResponse Error(int ReturnCode = (int)BHutechExceptionType.ERROR, object Data = null)
        {
            return new ApiResponse()
            {
                Data = Data,
                ReturnCode = ReturnCode
            };
        }

        public static ApiResponse ErrorInputDataEntity(object Data = null)
        {
            return new ApiResponse()
            {
                Data = null,
                ReturnCode = (int)BHutechExceptionType.ERROR_INPUT_DATA_ENTITY
            };
        }

        public static ApiResponse NotPermission()
        {
            return new ApiResponse()
            {
                Data = null,
                ReturnCode = (int)BHutechExceptionType.NOTPERMISSION
            };
        } 
        public static ApiResponse ApiNotPermissionCall()
        {
            return new ApiResponse()
            {
                Message = "Sai header. Bạn không có quyền gọi api này.",
                Data = null,
                ReturnCode = (int)BHutechExceptionType.APINOTPERMISSIONCALL
            };
        }

        public static ApiResponse LostSession(object Data = null)
        {
            return new ApiResponse()
            {
                Data = null,
                ReturnCode = (int)BHutechExceptionType.NotSession
            };
        }

        //public static ApiResponse PasswordIncorrect()
        //{
        //    return new ApiResponse()
        //    {
        //        Data = null,
        //        ReturnCode = (int)BHutechExceptionType.PASSWORD_INCORRECT
        //    };
        //}

        //public static ApiResponse AccountIsDelete()
        //{
        //    return new ApiResponse()
        //    {
        //        Data = null,
        //        ReturnCode = (int)BHutechExceptionType.ACCOUNT_IS_DETELE
        //    };
        //}

        //public static ApiResponse IDCardIncorrect()
        //{
        //    return new ApiResponse()
        //    {
        //        Data = null,
        //        ReturnCode = (int)BHutechExceptionType.IDCARD_INCORRECT
        //    };
        //}

        //public static ApiResponse UserNameIncorrect()
        //{
        //    return new ApiResponse()
        //    {
        //        Data = null,
        //        ReturnCode = (int)BHutechExceptionType.USERNAME_INCONRRECT
        //    };
        //}
    }
}