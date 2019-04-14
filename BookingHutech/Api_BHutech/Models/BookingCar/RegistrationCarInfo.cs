using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Models.BookingCar
{
    public class RegistrationCarInfo
    {
        public String RegistrationCarID { get; set; }
        public int Unit_ID { get; set; }
        public String Account_ID { get; set; }
        public String UnitRequest { get; set; }
        public String Reason { get; set; }
        public String Leader { get; set; }
        public String EmailLeader { get; set; }
        public String NumberPhoneLeader { get; set; }
        public DateTime? DateTimeFrom { get; set; }
        public DateTime? DateTimeTo { get; set; }
        public int NumberPeople { get; set; }
        public String RouteTo { get; set; }
        public String RouteBack { get; set; }
        public int? DistanceTo { get; set; }
        public int? DistanceBack { get; set; }
        public int? DistanceTotal { get; set; }
        public int Profile_Status { get; set; }
        public DateTime? CreatDay { get; set; }
        //public DateTime? ReceiveDate { get; set; }
        public String Note { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public String UserNameUpdate { get; set; }
        public int? CarTypeID { get; set; }
        public int? CarID { get; set; }
        public String DriverID { get; set; }
        public int PlanDistanceTo { get; set; } // lộ trình km đi dự kiến
        public int PlanDistanceBack { get; set; }// lộ trình km về dự kiến
        public String CarTypeNameRequest { get; set; } //ds loại xe mong muốn.

        public RegistrationCarInfo() { }
    }
}