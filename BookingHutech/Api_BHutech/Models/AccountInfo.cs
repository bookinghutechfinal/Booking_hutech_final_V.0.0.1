using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models
{
    public class AccountInfo : Unit
    {
        public string Account_ID { get; set; }
        public string Avatar { get; set; }
        public string AvatarNew { get; set; }
        //public int Unit_ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string NumberPhone { get; set; }
        public string IDCard { get; set; }
        public string Addres { get; set; }
        public string Email { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public string Session { get; set; }
        public DateTime? SessionDate { get; set; }
        public bool? IsChangePassword { get; set; }
        public string Account_Status { get; set; }
        public bool? Verify { get; set; }
        public string AccountType { get; set; }
        public string DriverLicenseNo { get; set; } // Số bằng lái
        public string LicenseClass { get; set; } // hạn bằng lái.  
        public DateTime? LicenseExpires { get; set; } // ngày hết hạn. 



    }
}