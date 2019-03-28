using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Enum
{
    public static class BookingType
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
        public static String Salt()
        {
            return "BOOKINGHUTECHFINAL"; 
        }
        public static string BookingKey()
        {
            return "123456789"; 
        }
        public enum BookingStatus
        {
            Offer = 1,
            WaitForApproval=2,
            Reserved = 3,
            Processing = 4,
            finish = 5,
            Cancel = 6
        }
    }
}