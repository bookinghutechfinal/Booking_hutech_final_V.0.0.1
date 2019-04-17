using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class GetListRegistrationCar : RegistrationCarInfo
    {
        public string Manager { get; set; }
        public string EmailManager { get; set; }
        public string NumberPhoneManager { get; set; }
    }
    /// <summary>
    /// Trả về danh sách đơn cấp phát - xem danh sách đơn cấp phát của Thư ký, trưởng khoa, QT, BGH. 
    /// </summary>
    public class GetListRegistrationCarResponseModel  
    {
        public List<GetListRegistrationCar> ListRegistrationCar { get; set; } 
    }

}