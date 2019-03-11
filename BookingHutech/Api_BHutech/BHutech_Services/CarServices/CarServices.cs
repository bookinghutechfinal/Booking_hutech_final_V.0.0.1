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
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;

namespace BookingHutech.Api_BHutech.CarServices.CarServices
{
    public class CarServices  
    {
        CarDAO carDAO = new CarDAO();

        /// <summary>
        /// Mr.Lam 8/3/2019
        /// GetListCar + List cartype
        /// </summary>
        /// <param name=""></param>
        /// <returns>ListCarResponseModel</returns> 
        public ListCarResponseModel GetListCarServices()
        {

            ListCarResponseModel result = new ListCarResponseModel();
            try
            { 
                string uspGetListCar = String.Format(Prototype.SqlCommandStore.uspGetListCar, (int)BookingType.CarType.Delete, (int)BookingType.CarType.Maintenance);
                string stringSqlGetCarTypeInfo = Prototype.SqlCommandStore.uspGetListCarType;
                result.ListCarType = carDAO.GetListCarTypeDAO(stringSqlGetCarTypeInfo);
                result.ListCar = carDAO.GetListCarDAO(uspGetListCar);
                return result;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }
 
        }
        

        /// <summary>
        /// GetListCarByCarTypeID
        /// Mr.Lam 8/3/2019
        /// </summary>
        /// <param name="request">CarTypeID</param>
        /// <returns>List car</returns>
        public ListCarResponseModel GetListCarByCarTypeIDServices(SearchCarRequestModel request)
        {

            ListCarResponseModel result = new ListCarResponseModel();
            try
            {
                string uspGetListCarByCarTypeID = String.Format(Prototype.SqlCommandStore.uspGetListCarByCarTypeID, (int)BookingType.CarType.Delete, (int)BookingType.CarType.Maintenance,request.CarTypeID);
                result.ListCar = carDAO.GetListCarDAO(uspGetListCarByCarTypeID);
                return result;

            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }

    }
}