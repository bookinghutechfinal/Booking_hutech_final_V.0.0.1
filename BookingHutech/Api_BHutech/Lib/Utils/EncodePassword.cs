using BookingHutech.Api_BHutech.Lib.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Api_BHutech.Lib.Utils
{
    public static class EncodePassword
    {
        public static string CreateSHA256(string request)
        {
            string key = BookingType.BookingKey();
            string pass = BookingType.Salt() + " " + request; 
            if ((key.Length % 2) == 1) key += '0';
            byte[] bytes = new byte[key.Length / 2];
            for (int i = 0; i < key.Length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(key.Substring(i, 2), 16);
            }
            var hmacsha256 = new HMACSHA256(bytes);
            byte[] hashValue = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(pass));
            string hexHash = "";
            foreach (byte test in hashValue)
            {
                hexHash += test.ToString("X2");
            }
            return hexHash;
        }

    }
}