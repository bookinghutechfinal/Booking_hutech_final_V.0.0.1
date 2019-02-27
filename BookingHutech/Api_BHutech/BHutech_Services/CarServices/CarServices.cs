using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib.Utils;
using Demo.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Lib;
using System.Web.Http;

namespace BookingHutech.Api_BHutech.CarServices.CarServices
{
    public class CarServices  
    {

        /// <summary>
        /// Anh.Tran: Create 24/1/2019 
        /// GetListCarDAL
        /// </summary>
        /// <param name="">ListCarRequestModel</param>
        /// <returns>ListCarResponseModel</returns> 
        public List<ListCarResponseModel> GetListCarDAL(ListCarRequestModel request)
        {

            ListCarResponseModel result = new ListCarResponseModel();
            EmployeeDAO employeeDAO = new EmployeeDAO();
            try
            { 
                string uspGetListCar = string.Format("{0} {1}", Prototype.SqlCommandStore.uspGetListCarByCarStatus, request.CarStatus) ;
                return result.listCar = employeeDAO.GetListEmployeeDAO(uspGetListCar); 
 
            }
            catch (BHutechException ex)
            {
                LogWriter.WriteException(ex);
                return result.listCar = null;
            }
 
        }
    }
}