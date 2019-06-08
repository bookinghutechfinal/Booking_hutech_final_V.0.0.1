using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class UpdateCarInfoRequestModel : CarInfo
    {
        public string RequestData =>
            $@"CarInfo: {this.CarID}
            CarName: {this.CarName}
            CarNo: {this.CarNo}
            CarTypeID: {this.CarTypeID}
            CarImage: {this.CarImage}
            Expires: {this.Expires}
            InsuranceExpires: {this.InsuranceExpires}
            FullNameUpdate: {this.FullNameUpdate}
            ";
    }
}