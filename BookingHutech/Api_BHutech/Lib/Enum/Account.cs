using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Enum
{
    public enum Gender
    {
        Female = 0,
        Male = 1
    }
    public enum IsChangePassword
    {
        ChangePassword = 1,  // Da change
        IsNotChangePassword = 0  // Chua change
    }
    /// <summary>
    /// Loại account
    /// </summary>
    public enum AccountType
    {
        Admin = 1,
        User = 0
    }


}