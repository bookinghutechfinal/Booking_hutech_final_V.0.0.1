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
    //IdleProvider.idle(5);
    IdleProvider.timeout(1800); // 30p
    KeepaliveProvider.interval(10);

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
   
 
   