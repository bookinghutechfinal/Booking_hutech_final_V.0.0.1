/////// <reference path="../../script/js/jquery.min.js" /> 
/////// <reference path="../../script/js/custom.min.js" />
///// <reference path="../controller/maincontroller.js" />

mainmodule.config(function ($stateProvider, $urlRouterProvider, $locationProvider, KeepaliveProvider, IdleProvider) {
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        var location = $location.path();
        if (location === "") {
            state.go("login");
        }
        else {
            state.go("error404");
        }
    });
    $stateProvider
        .state('login', {
            url: '/dang-nhap',
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
        .state('changePassword', {
            url: '/doi-mat-khau',
            templateUrl: '/wwwroot/views/pages/account/changePassword.html',
            controller: 'ChangePasswordController',
        })
        .state('main', {
            url: '/main',
            templateUrl: '/wwwroot/views/main.html',
            controller: 'mainController',

        })
        .state('main.home', {
            url: '/trang-chu',
            templateUrl: '/wwwroot/views/pages/home/home.html',
            controller: 'HomeController',
        })
        .state('main.bookingcar', {
            url: '/dat-xe',
            templateUrl: '/wwwroot/views/pages/booking/bookingCar/bookingCar.html',
            controller: 'BookingCarController',
        })
        .state('error404', {
            url: '/error404',
            templateUrl: '/wwwroot/views/common/error404.html',
            //controller: '404controller',
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
            /* --------  Booking car ---------- */
            'TypeCar': 'Loại xe',
            'All': '-- Tất cả --',
            'TitileSerachCar': 'Tìm kiếm xe',
            'SearchBookingCar': 'Tìm Kiếm',
            'ResultSerachBookingCar': 'Kết quả tìm kiếm',
            'ListCar': 'Danh sách xe',

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
