/////// <reference path="../../script/js/jquery.min.js" /> 
/////// <reference path="../../script/js/custom.min.js" />
///// <reference path="../controller/maincontroller.js" />

mainmodule.config(function ($stateProvider, $urlRouterProvider, $locationProvider, KeepaliveProvider, IdleProvider) {
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        var location = $location.path();
        if (location === "") {
          
        }
        else {
             state.go("main.home");  
             alert("Trang không tồn tại."); 
           
        }
        //if (location = "/main/unitDetail-RegisterBKCar/") {
        //    state.go("main.unitRegisterBookingCar");
        //} else if (location = "/main/manager-Detail-RegisterBKCar/") {

        //}
        switch (location) {
            case "":
                state.go("login");
                break;
            case "/main/unitDetail-RegisterBKCar": 
                state.go("main.unitRegisterBookingCar"); 
                break;
            case "/main/unitDetail-RegisterBKCar/":  // kiểm tra lại
                state.go("main.unitRegisterBookingCar"); 
                break;
            case "/main/manager-Detail-RegisterBKCar" :
                state.go("main.managerBookingCar");
                break; 
        }  
       
    });
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/wwwroot/views/pages/account/login.html',
            controller: 'LoginController',
            //resolve: {
            //    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            //        return $ocLazyLoad.load([
            //            {
            //                files: [
            //                    "Content/login.css",
            //                ]
            //            }, {
            //                serie: true,
            //                files: [
            //                    //"wwwroot/views/script/date.js",
            //                ]
            //            }]).then(function () {
            //                return $ocLazyLoad.load('wwwroot/controller/pages/account/loginController.js');
            //            });
            //    }],
            //},

        })
        .state('supporthome', {
            url: '/support-home',
            templateUrl: '/wwwroot/views/pages/support/supporthome.html',
            controller: 'SupportHomeController',
        })
        .state('changePassword', {
            url: '/change-password',
            templateUrl: '/wwwroot/views/pages/account/changePassword.html',
            controller: 'ChangePasswordController',
        })
        .state('main', {
            url: '/main',
            templateUrl: '/wwwroot/views/main.html',
            controller: 'mainController',

        })
        .state('main.home', {
            url: '/home',
            templateUrl: '/wwwroot/views/pages/home/home.html',
            controller: 'HomeController',
        })
        .state('main.bookingcar', {
            url: '/booking-car',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/bookingCar.html',
            controller: 'BookingCarController',
        })
        .state('main.cardetail', {
            url: '/detail-car/:CarID',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/carDetail.html',
            controller: 'DetailCarController',
        })
        .state('main.managerCarByDriver', {
            url: '/manager-car-by-driver',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/managerCarByDriver.html',
            controller: 'ManagerCarByDriverController',
        })
        .state('main.repairCost', {
            url: '/manager-repair-cost',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/managerRepairCost.html',
            controller: 'ManagerRepairCostController',
        })
        .state('main.fuelCost', {
            url: '/manager-fuel-cost',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/ManagerFuelCost.html',
            controller: 'ManagerFuelCostController',
        })
        .state('main.otherCost', {
            url: '/manager-other-cost',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/ManagerOtherCost.html',
            controller: 'ManagerOtherCostController',
        })
        .state('main.drivermanager', {
            url: '/driver-manager',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/ManagerDriver.html',
            controller: 'ManagerDriverController',
        })
        .state('main.reportCost', {
            url: '/report-cost',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/reportCost.html',
            controller: 'ManagerReportController',
        })
        .state('main.calendarDriver', {
            url: '/calendar-driver',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/calendarDriver.html',
            controller: 'ManagerCalendarDriverController',
        })
        .state('main.managerAccount', {
            url: '/manager-account',
            templateUrl: '/wwwroot/views/pages/account/managerAccount.html',
            controller: 'ManagerAccountController',
        })
        .state('main.assignDriver', {
            url: '/assign-driver',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/assignDriver.html',
            controller: 'AssignDriverController',
        })
        .state('main.bookingMeetingHall', {
            url: '/dat-hoi-truong',
            templateUrl: '/wwwroot/views/pages/booking/bookingMeetingHall/meetingHallInfo.html',
            controller: 'bookingMeetingHallController',
        })
        .state('main.managerBookingCar', { // phòng quản trị - BGH. 
            url: '/manager-Booking-Car',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/managerRegisterBookingCar.html',
            controller: 'ManagerRegisterBookingCarController',
        })
        // Xem chi tiết đơn cấp phát xe. 
        .state('main.managerDetailRegisterBKCar', {
            url: '/manager-Detail-RegisterBKCar/:RegistrationCarID/:ProfileStatus',
            //url: '/manager-Detail-RegisterBKCar',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/managerDetailRegisterBKCar.html',
            controller: 'ManagerDetailRegisterBKCarController',
            //params: {
            //    RegistrationCarID: null,   
            //    ProfileStatus: null,  

            //} 
        })
        .state('main.unitRegisterBookingCar', { // Khoa/Viện BGH 
            url: '/unitRegister-BookingCar',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/unitRegisterBookingCar.html',
            controller: 'UnitRegisterBookingCarController',
        })

        // Xem chi tiết đơn cấp phát xe - trưởng khoa - thư ky. 
        .state('main.unitDetailRegisterBKCar', {
            url: '/unitDetail-RegisterBKCar/:RegistrationCarID/:ProfileStatus',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/unitDetailRegisterBKCar.html',
            controller: 'UnitDetailRegisterBKCarController',
        })
        .state('error404', {
            url: '/error404',
            templateUrl: '/wwwroot/views/common/error/error404.html',
            controller: 'mainController',
        });

});
mainmodule.config(['$translateProvider',
    function ($translateProvider) {

        var $cookies;   // init cookies for init below
        angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
            $cookies = _$cookies_;
        }]);

        $translateProvider.translations('en', {
            /* -------- Menu Name 'Key': 'Valuse' ---------- */
            'Login': 'Login',
        });


        $translateProvider.translations('vn', {
            /* --------  Menu Main App ---------- */
            'Home': 'Trang chủ',
            /* -------- Login ---------- */
            'Login': 'Đăng Nhập',
            'PleaseInputAccountName': 'Vui lòng nhập tên đăng nhập!', 
            'PleaseInputPassword': 'Vui lòng nhập mật khẩu!',
            'LoginFail': 'Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!',
            'LoginSuccess': 'Đăng nhập thành công.', 
            'AccountDelete': 'Tài khoản này đã bị khóa. Vui lòng đăng nhập tài khoản khác!',
            'MessageChangeAccount': 'Vui lòng thay đổi mật khẩu cho lần đầu tiên đăng nhập vào hệ thống!',
            'NotVerify': 'Tài khoản này chưa được quản trị viên duyệt. Vui lòng đăng nhập tài khoản khác!',
            'CookiesInconrect': 'Vui lòng đăng nhập!',
            'InconrectSestion': 'Phiên bản làm việc hết hạn. Vui lòng đăng nhập lại!',
            'NotPermission': 'Xin lỗi! Bạn không có quyền thực hiện chức năng này!',
            /* -------- Logout ---------- */
            'TitleLogout': 'Đăng xuất',
            'QuestionLogout': 'Bạn có muốn đăng xuất hay không?',
            'CancelLogout': 'Hủy',
            'YesLogout': 'Đồng ý',
            'LogoutFail': 'Đăng xuất thất bại!',
            /* -------- Chang Password ---------- */
            'UserName': 'Tài khoản',
            'NewPassWord': 'Mật khẩu mới',
            'ConfirmPassWord': 'Nhập lại mật khẩu',
            'Update': 'Cập nhật',
            'PasswordError': 'Mật khẩu mới phải từ 6-12 ký tự bao gồm chữ hoa, thường, số, không khoản trắng và không chứa ký tự đặc biệt ngoại trừ @ và --',
            'PasswordAlreadyExist': 'Tài khoản đã tồn tại!',
            'ChangepassSuccess': 'Đổi mật khẩu thành công.', 
            /* --------  Booking car ---------- */
            'TypeCar': 'Loại xe',
            'All': '-- Tất cả --',
            'SearchChooseStatusRegter': '-- Vui lòng chọn --',
            'TitileSerachCar': 'Tìm kiếm xe',
            'SearchBookingCar': 'Tìm Kiếm',
            'ResultSerachBookingCar': 'Kết quả tìm kiếm',
            'ListCar': 'Danh sách xe',
            'DetailCar': 'Chi tiết xe',
            'TitileUpdateCarInfo': 'Cập nhật thông tin xe',
            'CalendarDriver': 'Lịch công tác',
            'assignDriver': 'Phân công',
            /* --------  Cost Manager ---------- */
            'CostManager': 'Quản lý chi phí',
            'RepairCostManager': 'Sửa chữa',
            'TitileDetailRepairCost': 'Chi tiết sửa chữa',
            'TitileAddNewCost': 'Thêm chi phí',
            'FuelCostManager': 'Nhiên liệu',
            'OtherCostManager': 'Chi phí khác',
            /* --------  Report Manager ---------- */
            'ReportCost': 'Thống kê chi phí',
            /* --------  Messager ---------- */
            'MessPleaseChoose': 'Vui lòng chọn!',
            /* --------  Manager Booking Car ---------- */
            'ManagerRegBkCar': 'Quản lý đơn cấp phát',
            'RegisterBKCarID': 'Mã đơn',
            'DateFrom': 'Từ ngày',
            'DateTo': 'Đến ngày',
            'Status': 'Trạng thái',
             



        });

        var language = $cookies.get('language');

        if (language == 'en')
            $translateProvider.preferredLanguage('en')
        else
            $translateProvider.preferredLanguage('vn')  //default

        $translateProvider.useSanitizeValueStrategy(null);

        // $translateProvider.useSanitizeValueStrategy('sanitize');
    }
]);
