using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class DeleteRegistrationCarRequestModel
    {
        public String RegistrationCarID { get; set; }

        public override string ToString()
        {
            return "DeleteRegistrationCarRequestModel With RegistrationCarID = " + this.RegistrationCarID; 
        }
    }
}