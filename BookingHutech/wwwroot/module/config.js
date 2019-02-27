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

        //< script async = "" src = "~/script/js/analytics.js" ></script >
        //    <script src="~/script/js/jquery.min.js"></script>
        //    <script src="~/script/js/bootstrap.min.js"></script>
        //    <script src="~/script/js/fastclick.js"></script>
        //    <script src="~/script/js/nprogress.js"></script>
        //    <script src="~/script/js/Chart.min.js"></script>
        //    <script src="~/script/js/gauge.min.js"></script>
        //    <script src="~/script/js/bootstrap-progressbar.min.js"></script>
        //    <script src="~/script/js/icheck.min.js"></script>
        //    <script src="~/script/js/skycons.js"></script>
        //    <script src="~/script/js/jquery.flot.js"></script>
        //    <script src="~/script/js/jquery.flot.pie.js"></script>
        //    <script src="~/script/js/jquery.flot.time.js"></script>
        //    <script src="~/script/js/jquery.flot.stack.js"></script>
        //    <script src="~/script/js/jquery.flot.resize.js"></script>
        //    <script src="~/script/js/jquery.flot.orderBars.js"></script>
        //    <script src="~/script/js/jquery.flot.spline.min.js"></script>
        //    <script src="~/script/js/curvedLines.js"></script>
        //< script src = "~/script/js/jquery.vmap.js" ></script >
        //    <script src="~/script/js/jquery.vmap.world.js"></script>
        //    <script src="~/script/js/jquery.vmap.sampledata.js"></script>
        //    <script src="~/script/js/moment.min.js"></script>
        //    <script src="~/script/js/daterangepicker.js"></script>

        //.state('home', {
        //    url: '/trang-chu',
        //    templateUrl: '/wwwroot/views/pages/home/home.html',
        //    controller: 'HomeController',
        //})


        //.state('main.dashboard', {
        //    url: '/Trang-chu',
        //    templateUrl: '/wwwroot/views/pages/home/dashboard.html',
        //    controller: 'dashboardController',
        //})

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
            /* -------- Menu Name ---------- */
            'ManageProfile': 'Quản lý hồ sơ',
        });


        $translateProvider.translations('vn', {
            /* --------  Menu Name ---------- */
            'ManageProfile': 'Quản lý hồ sơ',


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
