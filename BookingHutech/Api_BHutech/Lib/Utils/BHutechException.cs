using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Utils
{
    public class BookingHutechExceptionFactory
    {
        private BookingHutechExceptionFactory() { }
         
    }

    public enum BHutechExceptionType
    {
        SUCCESS = 1,  // thành công. 
        ERROR = 2,    // thất bại  
        ERROR_INPUT_DATA_ENTITY = 3, 
        NOT_PERMISSION = 4,   // Không có quyền  
        LOST_SESSION = 5,     // Mất sesstion. 

        //anh
        ACCOUNTDELETE = 102,
        NotSession = 114,
        ISCHANGEPASSWORD = 135,
        NOTPERMISSION = 150, // không có quyền (thực hiện chức năng
        APINOTPERMISSIONCALL = 151 // Không có quyền gọi api này. hết header or không có header. 
    }

    /// <summary>
    /// trạng thái  account
    /// </summary>
    public enum AccountStatus
    {
        active = 1,  // hoạt động
        delete = 0  // Xóa
    }


    public class BHutechException : Exception
    {
        public BHutechException() { }

        public BHutechException(int ReturnCode)
        {
            this.ReturnCode = ReturnCode;
        }

        public BHutechException(int ReturnCode, object Data)
        {
            this.ReturnCode = ReturnCode;
            this.data = Data;
        }

        public BHutechException(BHutechExceptionType ReturnCode)
        {
            this.ReturnCode = (int)ReturnCode;
        }

        public BHutechException(string message, BHutechExceptionType type, object data)
            : base(message)
        {
            this.type = type;
            this.data = data;
        }

        public BHutechException(string message, BHutechExceptionType type)
            : base(message)
        {
            this.type = type;
        }

        public BHutechException(string message, BHutechExceptionType type, Exception inner)
            : base(message, inner)
        {
            this.type = type;
        }

        public BHutechExceptionType type;
        public object data;
        public object data2;
        public int ReturnCode;
    }
}