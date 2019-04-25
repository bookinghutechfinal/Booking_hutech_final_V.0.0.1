using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Lib;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;

namespace BookingHutech.Api_BHutech.BHutech_Services.AccountServices
{
    public class UnitServices
    {
        UnitDAO unitDAO = new UnitDAO();

        /// <summary>
        ///  Anh.Tran Ceate 25/4/2019. Thêm mới đơn vị
        /// </summary>
        /// <param name="request">ManagerGetRoleMasterByAccountIDRequestModel</param>
        /// <returns>ManagerGetRoleMasterByAccountIDResponseModel</returns>
        public void CreateNewUnitServices(CreateNewUnitRequestModel request)
        {

            try
            {
                string stringSqluspCreateNewUnit = String.Format(Prototype.SqlCommandStore.uspCreateNewUnit, request.UnitName, request.UnitManager, request.EmailManage, request.NumberPhoneManager);
                unitDAO.CreateNewUnitDAO(stringSqluspCreateNewUnit);
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }
        /// <summary>
        ///  Anh.Tran Ceate 25/4/2019. Thêm mới đơn vị
        /// </summary>
        /// <param name="request">ManagerGetRoleMasterByAccountIDRequestModel</param>
        /// <returns>ManagerGetRoleMasterByAccountIDResponseModel</returns>
        public void EditUnitServices(EditUnitRequestModel request)
        {

            try
            {
                if (request.Unit_ID != 0)
                {
                    string uspEditNewUnit = String.Format(Prototype.SqlCommandStore.uspEditNewUnit, request.Unit_ID, request.UnitName, request.UnitManager, request.EmailManage, request.NumberPhoneManager);
                    unitDAO.CreateNewUnitDAO(uspEditNewUnit);
                }else
                {
                    throw new Exception(); 
                }
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw;
            }

        }
    }
}