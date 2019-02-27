using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Demo.Api_BHutech.Models.Response
{
    public class Car
    {
        public int CarID { get; set; }
        public String CarName { get; set; }
        public String CarNumber { get; set; }
        public int CarTypeID { get; set; }
        public int CarStatus { get; set; }
 
    }
}