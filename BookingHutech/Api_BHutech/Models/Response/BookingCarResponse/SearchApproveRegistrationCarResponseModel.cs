using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    /// <summary>
    /// ListCar: Trả về danh sách xe hoạt động
    /// ListRegistrationCar: Đơn cấp phát đã duyệt. 
    /// </summary>
    public class SearchApproveRegistrationCar
    {
        public List<CarInfo> ListCar { get; set; }
        public List<GetListRegistrationCar> ListRegistrationCar { get; set; }
    }
    public class SearchApproveRegistrationCarResponseModel
    {
        public List<CarInfo> ListCar { get; set; } 
    }
}