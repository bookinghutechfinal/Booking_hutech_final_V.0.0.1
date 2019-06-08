var mainmodule = angular.module('BHutechAppModule',
    [
        'ngIdle',              /*session*/
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        'ui.bootstrap',
        'ui.router',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'ngTable',            /*ng-table*/
        'toastr',              /*toastr show messeger*/
        'textAngular',
        'ng-fusioncharts',  /*Anh Create 14/3/2019*/
        'angularUtils.directives.dirPagination', /*Anh.Create 25/3/2019. Phân trang*/
        'ngMaterial',
    ]);
//Set timeout
angular.module('BHutechAppModule').config(['KeepaliveProvider', 'IdleProvider', function (KeepaliveProvider, IdleProvider) {
    IdleProvider.idle(1800);
    IdleProvider.timeout(5); // 30p 1800
   // KeepaliveProvider.interval(5);

    IdleProvider.interrupt('keydown wheel mousedown touchstart touchmove scroll');
}]);

mainmodule.run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;  
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true; 
        });
    }, false);
});

//var teamplate = {
//    header: 'wwwroot/views/common/header.html',
//    sidebar: 'wwwroot/views/common/sidebar-menu.html',
//    footer: 'wwwroot/views/common/footer.html',
//};

var AccountTypeRequest = [
    { AccountType: 1, AccountTypeName: "Nhân viên/GV" },
    { AccountType: 2, AccountTypeName: "Lãnh đạo" },
    //{ AccountType: 3, AccountTypeName: "Quản trị viên" },
    //{ AccountType: 4, AccountTypeName: "Văn phòng trường" },
    //{ AccountType: 5, AccountTypeName: "Ban Giám Hiệu" },
    { AccountType: 7, AccountTypeName: "Tài xế" },
]
var Account_StatusRequest = [ 
    { Account_Status: 0, Account_StatusName: "Khóa" }, 
    { Account_Status: 1, Account_StatusName: "Hoạt động" },
]
// 
var RoleStatus = [
    {
        'RoleStatusName': 'Đã Khóa',
        'RoleStatusID': 0
    },
    {
        'RoleStatusName': 'Hoạt động',
        'RoleStatusID': 1
    },
];
// trạng thái đơn cấp phát.
var RegistrationStatus = [
    { RegistrationStatusType: 1, RegistrationStatusName: "Nhân viên/GV lập đơn" },
    { RegistrationStatusType: 2, RegistrationStatusName: "Lãnh đạo duyệt" },
    { RegistrationStatusType: 3, RegistrationStatusName: "Lãnh đạo không duyệt" },
    { RegistrationStatusType: 4, RegistrationStatusName: "Phòng quản trị duyệt" },
    { RegistrationStatusType: 5, RegistrationStatusName: "Phòng quản trị không duyệt" },
    { RegistrationStatusType: 6, RegistrationStatusName: "Chờ BGH duyệt" },
    { RegistrationStatusType: 7, RegistrationStatusName: "BGH đã duyệt" },
    { RegistrationStatusType: 8, RegistrationStatusName: "BHG không duyệt" },
    { RegistrationStatusType: 9, RegistrationStatusName: "Đang thực hiện" },
    { RegistrationStatusType: 10, RegistrationStatusName: "Hoàn thành" },
];
//Trang thái đơn sửa chữa
var RepairStatus = [
    { RepairStatusType: 0, RepairStatusName: "Đề xuất" },
    { RepairStatusType: 1, RepairStatusName: "Chờ thực hiện" },
    { RepairStatusType: 2, RepairStatusName: "Chờ duyệt" },
    { RepairStatusType: 3, RepairStatusName: "Hoàn thành" },
    { RepairStatusType: 4, RepairStatusName: "Không duyệt" },
]
var Time = [
    // am
    { TimeValues: "01:00", TimeName: "1:00 AM" },
    { TimeValues: "01:30", TimeName: "1:30 AM" },
    { TimeValues: "02:00", TimeName: "2:00 AM" },
    { TimeValues: "02:30", TimeName: "2:30 AM" },
    { TimeValues: "03:00", TimeName: "3:00 AM" },
    { TimeValues: "03:30", TimeName: "3:30 AM" },
    { TimeValues: "04:00", TimeName: "4:00 AM" },
    { TimeValues: "04:30", TimeName: "4:30 AM" },
    { TimeValues: "05:00", TimeName: "5:00 AM" },
    { TimeValues: "05:30", TimeName: "5:30 AM" },
    { TimeValues: "06:00", TimeName: "6:00 AM" },
    { TimeValues: "06:30", TimeName: "6:30 AM" },
    { TimeValues: "07:00", TimeName: "7:00 AM" },
    { TimeValues: "07:30", TimeName: "7:30 AM" },
    { TimeValues: "08:00", TimeName: "8:00 AM" },
    { TimeValues: "08:30", TimeName: "8:30 AM" },
    { TimeValues: "09:00", TimeName: "9:00 AM" },
    { TimeValues: "09:30", TimeName: "9:30 AM" },
    { TimeValues: "10:00", TimeName: "10:00 AM" },
    { TimeValues: "10:30", TimeName: "10:30 AM" },
    { TimeValues: "11:00", TimeName: "11:00 AM" },
    { TimeValues: "11:30", TimeName: "11:30 AM" },
    { TimeValues: "12:00", TimeName: "12:00 AM" },
    { TimeValues: "12:30", TimeName: "12:30 AM" },
    //pm
    { TimeValues: "13:00", TimeName: "13:00 PM" },
    { TimeValues: "13:30", TimeName: "13:30 PM" },
    { TimeValues: "14:00", TimeName: "14:00 PM" },
    { TimeValues: "14:30", TimeName: "14:30 PM" },
    { TimeValues: "15:00", TimeName: "15:00 PM" },
    { TimeValues: "15:30", TimeName: "15:30 PM" },
    { TimeValues: "16:00", TimeName: "16:00 PM" },
    { TimeValues: "16:30", TimeName: "16:30 PM" },
    { TimeValues: "17:00", TimeName: "17:00 PM" },
    { TimeValues: "17:30", TimeName: "17:30 PM" },
    { TimeValues: "18:00", TimeName: "18:00 PM" },
    { TimeValues: "18:30", TimeName: "18:30 PM" },
    { TimeValues: "19:00", TimeName: "19:00 PM" },
    { TimeValues: "19:30", TimeName: "19:30 PM" },
    { TimeValues: "20:00", TimeName: "20:00 PM" },
    { TimeValues: "20:30", TimeName: "20:30 PM" },
    { TimeValues: "21:00", TimeName: "21:00 PM" },
    { TimeValues: "21:30", TimeName: "21:30 PM" },
    { TimeValues: "22:00", TimeName: "22:00 PM" },
    { TimeValues: "22:30", TimeName: "22:30 PM" },
    { TimeValues: "23:00", TimeName: "23:00 PM" },
    { TimeValues: "23:30", TimeName: "23:30 PM" },
    { TimeValues: "00:00", TimeName: "00:00 PM" },
    { TimeValues: "00:30", TimeName: "00:30 PM" },
]

var noImageAvatar = "data:image/png;base64,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"; 
 
   