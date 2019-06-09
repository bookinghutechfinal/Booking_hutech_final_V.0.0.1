using BookingHutech.Api_BHutech.Models.Response;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Script.Serialization;
using BookingHutech.Api_BHutech.Lib.Utils;
using System.Net.Http.Headers;
using BookingHutech.Api_BHutech.Lib.Enum;
using BookingHutech.Api_BHutech.DAO;
using BookingHutech.Api_BHutech.Prototype;
using BookingHutech.Api_BHutech.Models.Request.AccountRequest;
using BookingHutech.Api_BHutech.Models.Response.BookingCarResponse;
using BookingHutech.Api_BHutech.Models.BookingCar;
using BookingHutech.Api_BHutech.Models.Request.BookingCarRequest;
using static BookingHutech.Api_BHutech.Lib.Enum.BookingType;

namespace BookingHutech.Api_BHutech.Lib.Helper
{
    public class Helper
    {

        public string CreateID()
        {
            String TodayTime = DateTime.Now.ToString("ddHHmm");
            //  Random tạo khóa chính cho các table
            Random ran = new Random();
            long randomID = ran.Next(0, 99);
            string ID = "BK" + randomID + TodayTime;
            return ID;
        }

        public string ToDayDateTime()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:ss:mm");
        }


        /// <summary>
        /// Get SesstionSting
        /// </summary>
        /// <returns></returns>
        public string SesstionSting()
        {
            return Guid.NewGuid().ToString("N");
        }
        /// <summary>
        /// Get SessionDate
        /// </summary>
        /// <returns></returns>
        public string SessionDate()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }
        /// <summary>
        /// Trả về kết quả update cái gì. 
        /// </summary>
        /// <param name="request">
        //  Account_Status   -> 1
        //  Password  - IsChangePassword -> 2
        //  Verify           -> 3
        //  AccountType      -> 4 
        /// <returns></returns>
        public int ManagerUpdateTypes(ManagerUpdateAccountRequestModel request)
        {
            try
            {
                if (!DataEntity.checkDataNull(request.Account_Status))
                {
                    return 1;
                }
                if (!DataEntity.checkDataNull(request.Password) && !DataEntity.checkDataNull(request.IsChangePassword))
                {
                    return 2;
                }
                if (!DataEntity.checkDataNull(request.Verify))
                {
                    return 3;
                }
                if (!DataEntity.checkDataNull(request.AccountType))
                {
                    return 4;
                }
                return 0; // có lỗi
            }
            catch (Exception)
            {
                throw;
            }

        }

        // Hàm so sánh thời gian. 
        public int So_Sanh_Datetime(DateTime? dateTime1, DateTime? dateTime2)
        {
            try
            {
                if (dateTime1 > dateTime2)
                    return 1;
                return 2;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        // Ham 7. Hàm kiểm tra thuộc khoảng DateTime Về  thuộc khoảng DateTime đã duyệt
        public bool KT_ThuocKhoanThoiGian_Di_Ve(int Car_ID, DateTime? dateTime, List<GetListRegistrationCar> ListRegistrationCar)
        {
            try
            {
                for (int i = 0; i < ListRegistrationCar.Count; i++)
                {
                    if (ListRegistrationCar[i].CarID == Car_ID)
                    {
                        if (So_Sanh_Datetime(dateTime, ListRegistrationCar[i].DateTimeFrom) == 1)
                            return true;
                        else
                            return false;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return false;
        }
        // Hàm 8. Hàm kiểm tra thuộc khoảng DateTime Xe chợi chạy. TH7
        public bool KT_TrongKhoanThoiGianXeDoiChay(int Car_ID, SearchApproveRegistrationCarRequestModel requestDatetime, List<GetListRegistrationCar> ListRegistrationCar)
        {
            try
            {
                for (int i = 0; i < ListRegistrationCar.Count; i++)
                {
                    if (ListRegistrationCar[i].CarID == Car_ID)
                    {
                        if (So_Sanh_Datetime(requestDatetime.DateTimeFrom, ListRegistrationCar[i].DateTimeFrom) == 2 &&
                            So_Sanh_Datetime(requestDatetime.DateTimeTo, ListRegistrationCar[i].DateTimeFrom) == 1)
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }
            return false;
        }
        // Hàm 6: Hàm kiểm tra trùng Ngày giờ [Về].  
        public bool KT_Trung_Ngay_Gio_Ve(int Car_ID, DateTime? dateTime, List<GetListRegistrationCar> ListRegistrationCar)
        {
            try
            {
                for (int i = 0; i < ListRegistrationCar.Count; i++)
                {
                    if (ListRegistrationCar[i].CarID == Car_ID)
                    {
                        if (dateTime == ListRegistrationCar[i].DateTimeTo)
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }
            return false;
        }
        // Hàm 5: Hàm kiểm tra trùng Ngày giờ [Đi]. 
        public bool KT_Trung_Ngay_Gio_Di(int Car_ID, DateTime? dateTime, List<GetListRegistrationCar> ListRegistrationCar)
        {
            try
            {
                for (int i = 0; i < ListRegistrationCar.Count; i++)
                {
                    if (ListRegistrationCar[i].CarID == Car_ID)
                    {
                        if (dateTime == ListRegistrationCar[i].DateTimeFrom)
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }
            return false;
        }

        //  // check chính. Tính toán trả kết quả. 
        public int CheckItemCarFromListProfile(int Car_ID, SearchApproveRegistrationCarRequestModel requestDatetime, List<GetListRegistrationCar> ListRegistrationCar)
        {
            try
            {
                // Kiểm tra thời gian về thuộc khoảng DateTime đi về của xe  đã duyệt.
                bool KetQua_KT_DateTime_Ve = KT_ThuocKhoanThoiGian_Di_Ve(Car_ID, requestDatetime.DateTimeTo, ListRegistrationCar);
                // Kiểm tra thời gian Đi thuộc khoảng DateTime đi về của xe đã duyệt.  
                bool KetQua_KT_DateTime_Di = KT_ThuocKhoanThoiGian_Di_Ve(Car_ID, requestDatetime.DateTimeFrom, ListRegistrationCar);
                // Kiểm tra thời gian Đi, Vê Bao hàm cả Datetime  xe chạy đã duyệt.  TH7
                bool KetQua_KT_DateTime_XeDoiChay = KT_TrongKhoanThoiGianXeDoiChay(Car_ID, requestDatetime, ListRegistrationCar);
                bool KetQua_KT_Trung_NgayGio_Di = KT_Trung_Ngay_Gio_Di(Car_ID, requestDatetime.DateTimeFrom, ListRegistrationCar);
                bool KetQua_KT_Di_Trung_NgayGio_Ve = KT_Trung_Ngay_Gio_Di(Car_ID, requestDatetime.DateTimeTo, ListRegistrationCar);

                bool KetQua_KT_Trung_NgayGio_Ve = KT_Trung_Ngay_Gio_Di(Car_ID, requestDatetime.DateTimeTo, ListRegistrationCar);
                bool KetQua_KT_Ve_Trung_NgayGio_Di = KT_Trung_Ngay_Gio_Di(Car_ID, requestDatetime.DateTimeTo, ListRegistrationCar);


                if (KetQua_KT_Trung_NgayGio_Di == true &&
                   KetQua_KT_Trung_NgayGio_Ve == true)
                {
                    return 1; // TH4: DateTime Đi và DateTime về trùng với DateTime Đi và Về của xe đã duyệt trước đó. 
                }
                else
                   if (KetQua_KT_Trung_NgayGio_Di == true)
                {
                    return 2; // TH12: DateTime Đi trùng với DateTime Đi của xe đã được duyệt trước đó. 
                }
                else
                       if (KetQua_KT_Trung_NgayGio_Ve == true)
                {
                    return 3; // TH13: DateTime Về trùng với DateTime Về của xe đã được duyệt trước đó. 
                }
                else
                           if (KetQua_KT_Di_Trung_NgayGio_Ve == true)
                {
                    return 4; // TH3: DateTime Về trùng với DateTime Đi của xe đã được duyệt trước đó. 					
                }
                else
                               if (KetQua_KT_Ve_Trung_NgayGio_Di == true)
                {
                    return 5; // TH5: DateTime Đi trùng với DateTime Đi Về của xe đã được duyệt trước đó. 					
                }
                else
                                   if (KetQua_KT_DateTime_Ve == true && KetQua_KT_DateTime_Di == true)
                {
                    return 6; //TH10: DateTime đi và về thuộc khoảng DateTime đi và về của xe đã duyệt trước đó. 
                }
                else
                                       if (KetQua_KT_DateTime_Di == true)
                {
                    return 7;  //TH8: DateTime Đi thuộc khoảng DateTime Đi và Về của xe đã duyệt trước đó. 
                }
                else
                                           if (KetQua_KT_DateTime_Ve == true)
                {
                    return 8; //TH6: DateTime Về thuộc khoảng DateTime đi và về của xe đã duyệt trước đó. 
                }
                else
                                               if (KetQua_KT_DateTime_XeDoiChay == true)
                {
                    return 9; //TH7: DateTime Đi và Về Bao hàm cả  DateTime chạy của xe đã duyệt trước đó. 
                }
                else
                {
                    return 10; // ok có thể book. 
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }

        }

        // Trả kết quả
        public bool ResultCheckItemCarFromListProfile(int Car_ID, SearchApproveRegistrationCarRequestModel requestDatetime, List<GetListRegistrationCar> ListRegistrationCar)
        {

            if (CheckItemCarFromListProfile(Car_ID, requestDatetime, ListRegistrationCar) == 10)
                return true;
            return false;
        }

        // Trả về danh sách xe có thể book. cho đơn cấp phát đó. 
        public List<CarInfo> SearchApproveRegistrationCar(SearchApproveRegistrationCarRequestModel requestDatetime, SearchApproveRegistrationCar ListCarAndListRegCar)
        {
            List<CarInfo> listCarApproveRegistration = null;
            try
            {
                listCarApproveRegistration = new List<CarInfo>();
                CarInfo carInfo; // = new CarInfo();  
                for (int i = 0; i < ListCarAndListRegCar.ListCar.Count; i++)
                {
                    int count = 0;
                    for (int j = 0; j < ListCarAndListRegCar.ListRegistrationCar.Count; j++)
                    {
                        if (ListCarAndListRegCar.ListCar[i].CarID == ListCarAndListRegCar.ListRegistrationCar[j].CarID)
                        {
                            count++;
                        }
                    }
                    if (count != 0) // có tham gia vào đơn cấp phát nào chưa.
                    {
                        // có tham gia
                        bool resultCheckItemCar = ResultCheckItemCarFromListProfile(ListCarAndListRegCar.ListCar[i].CarID, requestDatetime, ListCarAndListRegCar.ListRegistrationCar);
                        if (resultCheckItemCar)
                        {
                            carInfo = new CarInfo();
                            carInfo.CarID = ListCarAndListRegCar.ListCar[i].CarID;
                            carInfo.CarImage = ListCarAndListRegCar.ListCar[i].CarImage;
                            carInfo.CarNo = ListCarAndListRegCar.ListCar[i].CarNo;
                            carInfo.CarStatus = (int)BookingType.CarType.EmptyCar;  // xe trống
                            carInfo.CarTypeID = ListCarAndListRegCar.ListCar[i].CarTypeID;
                            carInfo.CarTypeName = ListCarAndListRegCar.ListCar[i].CarTypeName;
                            carInfo.DriverID = ListCarAndListRegCar.ListCar[i].DriverID;
                            carInfo.FullNameDriver = ListCarAndListRegCar.ListCar[i].FullNameDriver;
                            listCarApproveRegistration.Add(carInfo);
                        }
                        else
                        {
                            carInfo = new CarInfo();
                            carInfo.CarID = ListCarAndListRegCar.ListCar[i].CarID;
                            carInfo.CarImage = ListCarAndListRegCar.ListCar[i].CarImage;
                            carInfo.CarNo = ListCarAndListRegCar.ListCar[i].CarNo;
                            carInfo.CarStatus = (int)BookingType.CarType.Active;  // xe hoạt động
                            carInfo.CarTypeID = ListCarAndListRegCar.ListCar[i].CarTypeID;
                            carInfo.CarTypeName = ListCarAndListRegCar.ListCar[i].CarTypeName;
                            carInfo.DriverID = ListCarAndListRegCar.ListCar[i].DriverID;
                            carInfo.FullNameDriver = ListCarAndListRegCar.ListCar[i].FullNameDriver;
                            listCarApproveRegistration.Add(carInfo);
                        }
                    } // không tham gia
                    else
                    {
                        carInfo = new CarInfo();
                        carInfo.CarID = ListCarAndListRegCar.ListCar[i].CarID;
                        carInfo.CarImage = ListCarAndListRegCar.ListCar[i].CarImage;
                        carInfo.CarNo = ListCarAndListRegCar.ListCar[i].CarNo;
                        carInfo.CarStatus = (int)BookingType.CarType.EmptyCar;  // xe trống
                        carInfo.CarTypeID = ListCarAndListRegCar.ListCar[i].CarTypeID;
                        carInfo.CarTypeName = ListCarAndListRegCar.ListCar[i].CarTypeName;
                        carInfo.DriverID = ListCarAndListRegCar.ListCar[i].DriverID;
                        carInfo.FullNameDriver = ListCarAndListRegCar.ListCar[i].FullNameDriver;
                        listCarApproveRegistration.Add(carInfo);
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }
            return listCarApproveRegistration; // danh sách xe có thể book.
        }
        // hàm kiểm tra cập nhật trạng thái cho xe khi tìm kiếm xe trống.  
        public int CheckStatusCarResult(int profileStatus)
        {
            if (profileStatus == 6)
                return (int)BookingType.CarType.WaitingForSchoolVerify;  // chờ BGH duyệt
            return (int)BookingType.CarType.EmptyCar; // trống; 
        }

        // Hàm kiểm tra trạng thái đơn cấp phát.   
        public bool CheckStatusProfileCar(int ProfileStatus)
        {
            if (ProfileStatus == (int)BookingStatus.Offer ||
                ProfileStatus == (int)BookingStatus.AdminNotVerify ||
                ProfileStatus == (int)BookingStatus.AdminVerify ||
                ProfileStatus == (int)BookingStatus.DeanNotVerify ||
                ProfileStatus == (int)BookingStatus.DeanVerify ||
                ProfileStatus == (int)BookingStatus.Finish ||
                ProfileStatus == (int)BookingStatus.Processing ||
                ProfileStatus == (int)BookingStatus.SchoolNotVerify ||
                ProfileStatus == (int)BookingStatus.SchoolVerify ||
                ProfileStatus == (int)BookingStatus.WaitingForSchoolVerify)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}