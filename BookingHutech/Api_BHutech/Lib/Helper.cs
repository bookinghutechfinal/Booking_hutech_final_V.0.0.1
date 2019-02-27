using BookingHutech.Api_BHutech.Models.Response;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Script.Serialization;
using BookingHutech.Api_BHutech.Lib.Utils;
using System.Net.Http.Headers;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.DAO;
using BookingHutech.Api_BHutech.Prototype;

namespace BookingHutech.Api_BHutech.Lib.Helper
{
    public class Helper : ApiController
    {
       
        public string CreateID()
        {
            String TodayTime = DateTime.Now.ToString("ddHHmm");
            //  Random tạo khóa chính cho các table
            Random ran = new Random();
            long randomID = ran.Next(0, 99);
            string ID = "BK" + randomID + TodayTime;
            return ID;
        }

        public string ToDayDateTime()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:ss:mm");
        }


        /// <summary>
        /// Get SesstionSting
        /// </summary>
        /// <returns></returns>
        public string SesstionSting()
        {
            return Guid.NewGuid().ToString("N");
        }
        /// <summary>
        /// Get SessionDate
        /// </summary>
        /// <returns></returns>
        public string SessionDate()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }

        
    }
}