using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Request.AccountRequest
{
    public class CreateNewAccountRequestModel : AccountInfo
    {

    }

    public class AddNewAccountRequestModel
    {
        public CreateNewAccountRequestModel createNewAccountRequestModel { get; set; }
        public List<UpdateRoleRequestModel> updateRoleRequestModel { get; set; }
    }
}