using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Enum
{
    public class BookingType
    {
        /// <summary>
        /// Trang thái xe
        /// </summary>
        public enum CarType
        {
            Delete = 0, // đã xóa xe. 
            Active = 1, // hoạt động
            EmptyCar = 2, // xe trống.
            NotEmptyCar = 3, // có người booking
            Maintenance = 4,  // bảo trì, sửa chữa
        }
        public enum ApiRequestType
        {
 
            Web = 1,
            Mobile = 2, 
        }
        public enum ApiHeaderKey
        {
            BHAPIWebCall = 1,
        }
    }
}