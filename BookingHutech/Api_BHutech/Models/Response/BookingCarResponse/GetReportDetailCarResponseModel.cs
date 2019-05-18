using BookingHutech.Api_BHutech.Models.BookingCar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.Response.BookingCarResponse
{
    public class GetReportDetailCarResponseModel
    {
        public int SumKM { get; set; }
        public int SumKMMonth { get; set; }
        public int MonthDone { get; set; }
        public int YearDone { get; set; }
    }

    public class GetCarDetail
    {
        public List<CarInfo> ListCarInfo { get; set; }
        public List<GetReportDetailCarResponseModel> ListReportDetailCarResponseModel { get; set; }
        public List<GetRegistrationCarByCarID> ListRegistrationCarByCarID { get; set; }
        public List<ListRepairCost> ListRepairCostByCarID { get; set; }
        public List<AssignDriverInfo> ListAssignDriverInfo { get; set; }
    }
    
}