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
        #region List carstatus
        public class ListCarStatus {
            public int[] listCarStatus = { 0, 1, 4 };
        }

        public enum CarStatus
        {
            deleted = 0,
            active = 1,
            repairing = 5
        }
        #endregion

        public enum BookingStatus
        {
            Offer = 1,
            DeanVerify = 2, //trưởng khoa duyệt
            DeanNotVerify = 3, //trưởng khoa hủy
            AdminVerify = 4, //phòng quản trị duyệt
            AdminNotVerify = 5, //phòng quản trị hủy
            WaitingForSchoolVerify = 6, // Chờ trường duyệt
            SchoolVerify = 7, // trường duyệt.
            SchoolNotVerify = 8, // trường không duyệt.
            Processing = 9, //đang thực hiện
            Finish = 10 //Hoàn thành
        }
    }
}