using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class GetDetailRegistration : RegistrationCarInfo
    { 
        public string Manager { get; set; }
        public string EmailManager { get; set; }
        public string NumberPhoneManager { get; set; }
    }
    /// <summary>
    /// Trả về chi tiết đơn cấp phát - xem danh sách đơn cấp phát của Thư ký, trưởng khoa, QT, BGH. 
    /// </summary>
    public class GetDetailRegistrationResponseModel
    {
        public List<GetDetailRegistration> ListRegistrationCar { get; set; } 
    }

}