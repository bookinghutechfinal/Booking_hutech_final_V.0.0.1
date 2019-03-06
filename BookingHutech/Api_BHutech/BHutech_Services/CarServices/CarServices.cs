using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.DAO.CarDAO;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Lib;
using System.Web.Http;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;

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
        public List<ListCarResponseModel> GetListCarServices()
        {

            ListCarResponseModel result = new ListCarResponseModel();
            EmployeeDAO employeeDAO = new EmployeeDAO();
            try
            { 
                string uspGetListCar = String.Format(Prototype.SqlCommandStore.uspGetListCar, (int)BookingType.CarType.Delete, (int)BookingType.CarType.Maintenance);
                return result.listCar = employeeDAO.GetListCarDAO(uspGetListCar); 
 
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                return result.listCar = null;
            }
 
        }

        public List<CarTypeResponseModel> getListCarTypeServices()
        {

            CarTypeResponseModel result = new CarTypeResponseModel();
            EmployeeDAO employeeDAO = new EmployeeDAO();
            try
            {
                string stringSqlGetCarTypeInfo = Prototype.SqlCommandStore.uspGetListCarType;
                return result.CarType = employeeDAO.getListCarTypeDAO(stringSqlGetCarTypeInfo);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                return result.CarType = null;
            }
        }

        public List<ListCarResponseModel> GetListCarByCarTypeIDServices(SearchCarRequestModel request)
        {

            ListCarResponseModel result = new ListCarResponseModel();
            EmployeeDAO employeeDAO = new EmployeeDAO();
            try
            {
                string uspGetListCarByCarTypeID = String.Format(Prototype.SqlCommandStore.uspGetListCarByCarTypeID, (int)BookingType.CarType.Delete, (int)BookingType.CarType.Maintenance,request.CarTypeID);
                return result.listCar = employeeDAO.GetListCarDAO(uspGetListCarByCarTypeID);

            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                return result.listCar = null;
            }

        }

    }
}