using BookingHutech.Api_BHutech.Lib.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class UpdateCarStatusRequestModel
    {
        public int CarID { get; set; }
        public int CarStatus { get; set; }
        public UpdateCarStatusResponseType ReturnCode { get; set; }
    }
}