var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
// Anh create kiểm tra email 
var checkEmailInput = function (email) {
    if (!filter.test(email))
        return false;
    return true;
}

// Hàm 1: Check dữ liệu Null 
var checkNull = function (request) {
    if (request === null || request === "" || request === undefined || request === "Invalid date" || request === 0) {
        return true;
    }
    else {
        return false;
    }

}
// Hàm 1: Check dữ liệu  = 0, Null
var checkNull_0 = function (request) {
    if (request === null || request === "" || request === undefined || request === "Invalid date" || request === 0) {
        return true;
    }
    else {
        return false;
    }

}

// Hàm 2: Kiểm tra đã change pass word chưa.
var KiemTraIsChangePassword = function (request) {
    if (request.IsChangePassword === true) {  // đổi pass
        return true;
    } else {
        return false;
    }
}

var CheckAccountLoginAndChangePass = function (accountInfo) {
    if (checkNull(accountInfo) == true) {
        return 1; // chưa đăng nhập. 
    }
    else if (!checkNull(accountInfo) && accountInfo.ObjAccountInfo.IsChangePassword === false) {
        return 2; // đăng nhập rồi. chưa change
    }
    else if (checkNull(accountInfo) !== true) {
        return 3; // đã đăng nhập. 
    }
}


// Hàm 3: Kiểm tra UserName và Password
var CheckDataLogin = function (request) {
    if (checkNull(request.UserName) === true) { //Vui lòng nhập tên đăng nhập!
        return 137;
    } else if (checkNull(request.Password) === true) { //Vui lòng nhập mật khẩu!
        return 138;
    }
}

 //Hàm 4: Kiểm tra  Password và ConfirmPassWord
var CheckDataChangePassword = function (request) {
    if (checkNull(request.Password) === true) {  
        return 139;
    }
    if (checkNull(request.ConfirmPassWord) === true) {  
        return 140;
    }
    if (request.ConfirmPassWord !== request.Password ) {  
        return 141;
    }
}

// Hàm 6: Kiểm tra loại tài khoản. 
var CheckAccountType = function (accountType) {
    if (accountType === '1') {
        return 1; // thư ký khoa
    } else if (accountType === '2') {
        return 2; // trưởng khoa
    } else {
        return 1;  // mặt định
    }
}

//  Hàm 7:  Định dạng thời gian
//var toApiDate = function (date) {
//    return moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
//}
var FormatDateTime = function (date) {
    return moment(date, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
}

var FormatDateAdminSearchTime = function (date) { // Update
    return moment(date, 'HH:mm:ss DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
}

var FormatDateTimeByDBResponse = function (date) { // Update
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')
}

var FormatDateTimeByDBResponse1 = function (date) { // Update
    return moment(date, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY')
}

var FormatDateTimeByDBResponse2 = function (date) { // Update
    return moment(date, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY')
}

var FormatDateTimeToDBRequest = function (date) { // Update
    return moment(date, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
}

// Input từ layout
var FormatDateFromTo = function (date) {
    return moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD')
}
// And crate  14/4/2019 Input time từ layout "4/14/2019, 7:39:44 PM"
var FormatTimeFromTo = function (date) {
    return moment(date, 'MM/DD/YYYY, HH:mm A').format('HH:mm')
}
// Anh create. Định dạng ngày tháng thời gian sang số.  // 2019-04-14 6:00
var FormatDateTimeInputToNumber = function (date) {
    return moment(date, 'DD-MM-YYYY HH:mm').format('YYYYMMDDHHmm')
}

// Anh create. Định dạng ngày tháng thời gian sang số.  // 2019-04-14 6:00
var FormatDateTimeInputToNumber2 = function (date) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format("YYYYMMDDHHmmss");
}
// Anh create 14/4/2019:  Hàm so sánh thời gian  Đi và về
var CompareDateTimeFromTo = function (DateTime1, DateTime2) {
    if (FormatDateTimeInputToNumber(DateTime1) >= FormatDateTimeInputToNumber(DateTime2)) {
        return true; // time 1 lớn or  = . 
    } else {
        return false; // time 2 lớn hơn
    }
}
// anh crate 14/4/2019 check độ dài ký tự  
var ChechLength = function (request) {
    if (request.length < 20)
        return false;
    return true;
}
// check lớn hơn ngày hiện tại
var CheckDateTimeMaxvsDateToDay = function (DateTimeFrom) {
    var ToDay = new Date();

    var toDateTime = ToDay.getDate() + "-" + ToDay.getMonth() + "-" + ToDay.getFullYear() + " " + ToDay.getHours() + ":" + ToDay.getSeconds();
    if (FormatDateTimeInputToNumber(DateTimeFrom) <= FormatDateTimeInputToNumber(toDateTime)) 
        return true
    return false; 
}

var FormatDate = function (date) {
    return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
}
var FormatDateFromTo = function (date) {
    return moment(date, 'MM-DD-YYYY').format('YYYY-MM-DD')
}
// Định dạng ngày sang số. 
var FormatDateFromToToNumber = function (date) {
    return moment(date, 'MM/DD/YYYY').format('YYYYMMDD')
}
// Định dạng ngày sang số. 
var FormatDateFromToToNumber1 = function (date) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYYMMDD')
}
// Định dạng giờ sang số. 
var FormatTimeFromToToNumber = function (date) {
    return moment(date, 'HH:mm').format('HHmm')
}


var FormatDateTime_ = function (date) {
    return moment(date, 'YYYY-DD-MM HH:mm:ss').format('HH:mm:ss MM-DD-YYYY')
}
var FormatDateTime2 = function (date) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss DD/MM/YYYY')
}
// Tách ngày giờ trả lên từ DB
var FormatToDate = function (date) {
    return moment(date, 'MM/DD/YYYY HH:mm:ss').format('MM-DD-YYYY')
}
var FormatToTime = function (time) {
    return moment(time, 'MM/DD/YYYY HH:mm:ss').format('HH:mm')
}
//var FormatDateTime_ = function (date) { 
//    return moment(date, 'YYYY-DD-MM-HH-mm').format('YYYY-DD-MM HH:mm')
//}
var FormatDateTimeToNumber = function (date) {
    return moment(date, 'MM/DD/YYYY HH:mm').format('YYYYMMDDHHmm')
}

var FormatTimeToNumber = function (time) {
    return moment(time, 'HH:mm').format('HHmm')

}










//var checkFromToDate = function (fromDate, toDate) {
//    return moment(toDate, 'DD-MM-YYYY HH:mm') > moment(fromDate, 'DD-MM-YYYY HH:mm');
//}
//var checkFromToDate_ = function (fromDate, toDate) {
//    return moment(fromDate >= toDate);
//}

var checkDiffFromToDate = function (fromDate, toDate, maxDay) {
    return moment(fromDate, 'DD-MM-YYYY HH:mm').add(maxDay, 'd') >= moment(toDate, 'DD-MM-YYYY HH:mm');
}

var checkDiffFromToDate1 = function (fromDate, toDate, maxDay) {
    return moment(fromDate, 'YYYY-MM-DD').add(maxDay, 'd') >= moment(toDate, 'YYYY-MM-DD');
}

// Hàm 2:  Hàm so sánh ngày Đi và về YYYY-MM-DD
var So_Sanh_DateInput2 = function (DateTime_1, DateTime_2) {
    if (FormatDateFromToToNumber1(DateTime_1) >= FormatDateFromToToNumber1(DateTime_2)) {
        return true; // datetime 1 lớn or  = . 
    } else {
        return false; // datetime 2 lớn hơn
    }
}

// Hàm 2:  Hàm so sánh ngày Đi và về
var So_Sanh_DateInput = function (DateTime_1, DateTime_2) {
    if (FormatDateTimeToNumber(DateTime_1) >= FormatDateTimeToNumber(DateTime_2)) {
        return true; // datetime 1 lớn or  = . 
    } else {
        return false; // datetime 2 lớn hơn
    }
}
// Hàm 2:  Hàm so sánh thời gian  Đi và về
var So_Sanh_TimeInput = function (Time_1, Time_2) {
    if (FormatTimeToNumber(Time_1) >= FormatTimeToNumber(Time_2)) {
        return true; // time 1 lớn or  = . 
    } else {
        return false; // time 2 lớn hơn
    }
}



// Hàm 8: Kiểm tra dữ liệu cho Chức Năng tìm kiếm xe trống. 
var checkSearchCar = function (request) {
    if (checkNull(request.FormDate) == true) {
        return 142;
    } else if (checkNull(request.FormTime) == true) {
        return 143;
    }
    else if (checkNull(request.ToDate) == true) {
        return 144
    }
    else if (checkNull(request.ToTime) == true) {
        return 145;
    }
    else if (So_Sanh_DateInput(request.FormDate, request.ToDate)) {
        return 146;
    } else if (So_Sanh_TimeInput(request.FormTime, request.ToTime)) {
        return 147;
    }
}

var CheckRegistration = function (request) {
    if (checkNull(request.FormDate) == true) {
        return 1;
    }
}

// Cập nhật loại tài khoản
// Request AccountType
// Return AccountTypeName
var ConvertAccountTypeIDToName = function (accountID) {
    if (accountID === "1") {
        return AccountTypeRequest[0].AccountTypeName;
    }
    if (accountID === "2") {
        return AccountTypeRequest[1].AccountTypeName;
    }
    if (accountID === "3") {
        return AccountTypeRequest[2].AccountTypeName;
    }
    if (accountID === "4") {
        return AccountTypeRequest[3].AccountTypeName;
    } accountID
    if (accountID === "5") {
        return AccountTypeRequest[4].AccountTypeName;
    } accountID
    if (accountID === "7") {
        return AccountTypeRequest[5].AccountTypeName;
    }
}

// Cập nhật trạng thái cho tài khoản
var ConvertAccountStatusIDToName = function (accountStatusID) {
    if (accountStatusID === "0") {
        return Account_StatusRequest[0].Account_StatusName;
    }
    if (accountStatusID === "1") {
        return Account_StatusRequest[1].Account_StatusName;
    }
}
// Anh create
// Request: AccountTypeName
// Response:  RegistrationStatusType
var ReturnAccountType = function (AccountType) {
    if (parseInt(AccountType) == AccountTypeRequest[0].AccountType) { // THƯ KÝ
        return RegistrationStatus[0].RegistrationStatusType;
    }
    if (parseInt(AccountType) == AccountTypeRequest[1].AccountType) { // TRƯỞNG KHOA
        return RegistrationStatus[1].RegistrationStatusType;
    }
    if (parseInt(AccountType) == AccountTypeRequest[2].AccountType) { // Quản trị
        return RegistrationStatus[1].RegistrationStatusType;
    }
    if (parseInt(AccountType) == AccountTypeRequest[4].AccountType) { // BHG
        return RegistrationStatus[5].RegistrationStatusType;
    }

}

// Cập nhật trạng thái đơn cấp phát hiển thị lên đơn đăng ký
// Request ProfileStatusID
// Return Profile_StatusName
var ConvertProfileCarStatusIDToName = function (profileStatusID) {
    if (profileStatusID === 1) {
        return "Chờ trưởng khoa duyệt";
    }
    if (profileStatusID === 2) {
        return "Chờ quản trị duyệt";
    }
    if (profileStatusID === 3) {
        return RegistrationStatus[2].RegistrationStatusName;
    }
    if (profileStatusID === 4) {
        return RegistrationStatus[3].RegistrationStatusName;
    }  
    if (profileStatusID === 5) {
        return RegistrationStatus[4].RegistrationStatusName;
    }  
    if (profileStatusID === 6) {
        return RegistrationStatus[5].RegistrationStatusName;
    }
    if (profileStatusID === 7) {
        return RegistrationStatus[6].RegistrationStatusName;
    }
    if (profileStatusID === 8) {
        return RegistrationStatus[7].RegistrationStatusName;
    }
    if (profileStatusID === 9) {
        return RegistrationStatus[8].RegistrationStatusName;
    }
    if (profileStatusID === 10) {
        return RegistrationStatus[9].RegistrationStatusName;
    }

}
// Hiển thị thông tin xe 
var CheckProfileRegisterCar = function (profileStatusID) {
    if (profileStatusID == 4 || profileStatusID == 6 || profileStatusID == 7 || profileStatusID == 8 || profileStatusID == 9 || profileStatusID == 10)
        return true;
    return false
}