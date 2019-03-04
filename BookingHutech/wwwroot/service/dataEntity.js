var filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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

// Input từ layout
var FormatDateFromTo = function (date) {
    return moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD')
}
// Định dạng ngày sang số. 
var FormatDateFromToToNumber = function (date) {
    return moment(date, 'MM/DD/YYYY').format('YYYYMMDD')
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


var convertDateTime = function (str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    return date.getFullYear() + "-" + mnth + "-" + day + " " + hours + ":" + minutes;
    //return [ date.getFullYear(), mnth, day, hours, minutes ].join("-");
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
