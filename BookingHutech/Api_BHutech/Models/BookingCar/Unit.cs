﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.BookingCar
{
    public class Unit
    {
        public int Unit_ID { get; set; }
        public string UnitName { get; set; }
        public string Manager { get; set; }
        public string EmailManager { get; set; }
        public string NumberPhoneManager { get; set; }
    }
}