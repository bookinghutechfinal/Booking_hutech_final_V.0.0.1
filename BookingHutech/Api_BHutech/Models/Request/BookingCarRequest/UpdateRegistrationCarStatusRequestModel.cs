﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.BookingCarRequest
{
    public class UpdateRegistrationCarStatusRequestModel
    {
        public String RegistrationCarID { get; set; }
        public int Profile_Status { get; set; }
        public int? DistanceTo { get; set; }
        public int? DistanceBack { get; set; }
        public int? CarID { get; set; }
        public String  UserNameUpdate { get; set; } // anh. update 19/4/2019
        public int? CarTypeID { get; set; } // anh. update 19/4/2019
        public String DriverID { get; set; } // anh. update 19/4/2019
        public String Note { get; set; } // anh. update 19/4/2019
    }
}