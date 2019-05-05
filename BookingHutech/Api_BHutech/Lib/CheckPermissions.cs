using BookingHutech.Api_BHutech.DAO;
using BookingHutech.Api_BHutech.Lib.Utils;
using BookingHutech.Api_BHutech.Models.Response;
using BookingHutech.Api_BHutech.Prototype;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BookingHutech.Api_BHutech.DAO.AccountDAO;
using BookingHutech.Api_BHutech.Models.Response.AccountResponse;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.BHutech_Services.AccountServices;
using BookingHutech.Api_BHutech.Models.Request;
using System.Net.Http.Headers;
using System.Web.Script.Serialization;
using BookingHutech.Api_BHutech.Models; 

namespace BookingHutech.Api_BHutech.Lib
{
    public class CheckPermissions
    {
        AccountServices accountServices = new AccountServices();
        CheckPermissionResponseModel checkPermissionResponse = new CheckPermissionResponseModel();
        /// <summary>
        /// Kiểm tra login, quyền, trả két quả về cho -> hàm kiểm tra -> trả về cho controller
        /// </summary>
        /// <param name="accountInfo">Account Info</param>
        /// <param name="guleCode">Gule Code</param>
        /// <returns></returns>
        public int ResponseCheckPermissions(int RuleCode, CookieHeaderValue CookieAccountInfo)
        {
            //    (int)BHutechExceptionType.ACCOUNTDELETE
            //    ACCOUNTDELETE = 102,
            //NotSession = 114,
            //ISCHANGEPASSWORD = 135,
            //NOTPERMISSION = 150, 
            try
            {
                if (CookieAccountInfo == null)
                {
                    return (int)BHutechExceptionType.NotSession; // Mất Sess trên web. 
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                string strAccountInfo = CookieAccountInfo.Cookies[0].Value;
                AccountInfo AccountInfo = js.Deserialize<AccountInfo>(strAccountInfo);
                checkPermissionResponse = accountServices.CheckPermissionsServices(AccountInfo.Account_ID);

                if (checkPermissionResponse.GetAccountInfo[0].Account_Status == "0")
                {
                    return (int)BHutechExceptionType.ACCOUNTDELETE;
                }
                 
                else if (checkPermissionResponse.GetAccountInfo[0].Session == "" || checkPermissionResponse.GetAccountInfo[0].Session != AccountInfo.Session)
                {
                    return (int)BHutechExceptionType.NotSession; // Mất sesstion: Có người đã logout. Login lại.
                }
                //// Dùng để Phát triển change 60 ngày nhá. 
                //else if (checkPermissionResponse.GetAccountInfo[0].IsChangePassword == false)
                //{
                //    return (int)BHutechExceptionType.ISCHANGEPASSWORD; ; //135; // ChangePass; 
                //}
                else if (checkPermissionResponse.GetAccountInfo.Count == 0 || checkPermissionResponse.GetRoleCode.Count == 0)
                {
                    return (int)BHutechExceptionType.NOTPERMISSION;  // Không có quyền. 
                }
                else
                { // Kiểm tra quyền. 

                    int count = 0;
                    for (int i = 0; i < checkPermissionResponse.GetRoleCode.Count; i++)
                    {
                        if (checkPermissionResponse.GetRoleCode[i].RoleCode == RuleCode && checkPermissionResponse.GetRoleCode[i].RoleDetail_Status != false)
                        {
                            count++;
                        }

                    }
                    if (count == 0)
                    {
                        return (int)BHutechExceptionType.NOTPERMISSION;  // Không có quyền. 
                    }
                }
                return (int)BHutechExceptionType.SUCCESS;  // Ok -> tiếp tục. 
            }
            catch (Exception )
            {
                //LogWriter.WriteException(ex);
                throw; // có lỗi kiểm tra quyền.
            }
        }
    }
}