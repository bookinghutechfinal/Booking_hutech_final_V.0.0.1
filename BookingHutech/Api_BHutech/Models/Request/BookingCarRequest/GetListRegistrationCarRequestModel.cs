using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    
    public class GetListRegistrationCarRequestModel
    {   // Lấy đơn cấp phát theo trạng thái. Dùng cho account cấp 3: (QT & BGH)
        public int ProfileStatus { get; set; }
        // lấy chi tiết theo RegisterID  Dùng cho account cấp 1,2: (Thư ký & trưởng khoa)
        public String RegistrationCarID { get; set; }
        public int Unit_ID { get; set; }
    }
}