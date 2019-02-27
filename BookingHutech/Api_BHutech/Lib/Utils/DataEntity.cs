using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Utils
{
    public class DataEntity
    {
        public static bool checkLength(string input)
        {
            if (input.Length >= 6 && input.Length <= 20)
                return true;
            return false;
        }
        public static bool ConfirmPassWordother(string input_1, string input_2)
        {
            if (input_1 != input_2)
                return true;
            return false;
        }
        // Check pass word 
        public static bool checkPassWord(string input)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var spacebar = new Regex(@"[\s]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasLowerChar = new Regex(@"[a-z]+");
            var hasMinimum8Chars = new Regex(@".{6,}");
            var regex = new Regex(@"^[_a-zA-Z0-9\W]+$");
            var isValidated =
            hasNumber.IsMatch(input)
            && !spacebar.IsMatch(input)
            && hasUpperChar.IsMatch(input)
            && hasLowerChar.IsMatch(input)
            && regex.IsMatch(input)
            && hasMinimum8Chars.IsMatch(input)
            && checkLength(input) == true;
            return isValidated;

        }

        // Check null .
        public static bool  checkDataNull(string request) {
            if (request == null || request == "") {
                return true; 
            }
            return false; 
        }
        public static bool checkData(int request)
        {
            if (request == 0)
            {
                return true;
            }
            return false;
        }
        public  bool checkDatetime(DateTime request) {
            if (request == null ) {
                return true; 
            }
            return false; 
        }
    }
}