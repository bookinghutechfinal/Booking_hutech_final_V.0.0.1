using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Lib.Enum;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Api_BHutech.BHutech_Services
{
    public class Permissions
    {
        /// <summary>
        /// anh.tran 24/2/2019
        /// </summary>
        /// <param name="Header"></param>
        /// <returns>1,2,0</returns>

        public static int CheckAPIRequest(String Header)
        {
            if (Header == ApiRequestType.Web.ToString() && Header != null)
            {
                return 1; // web
            }
            else if (Header == ApiRequestType.Mobile.ToString() && Header != null)
            {
                return 2; // app
            }

            else
            {
                return 0;
            } 
        }
    }
}