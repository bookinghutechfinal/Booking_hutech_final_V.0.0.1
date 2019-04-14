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
    ]);
//Set timeout
angular.module('BHutechAppModule').config(['KeepaliveProvider', 'IdleProvider', function (KeepaliveProvider, IdleProvider) {
    IdleProvider.idle(5);
    IdleProvider.timeout(5);
    KeepaliveProvider.interval(10);

    IdleProvider.interrupt('keydown wheel mousedown touchstart touchmove scroll');
}]);


//var teamplate = {
//    header: 'wwwroot/views/common/header.html',
//    sidebar: 'wwwroot/views/common/sidebar-menu.html',
//    footer: 'wwwroot/views/common/footer.html',
//};

var AccountTypeRequest = [
    { AccountType: 1, AccountTypeName: "Thư ký" },
    { AccountType: 2, AccountTypeName: "Trưởng khoa" },
    { AccountType: 3, AccountTypeName: "Phòng quản trị" },
    { AccountType: 4, AccountTypeName: "Văn phòng trường" },
    { AccountType: 5, AccountTypeName: "Ban giám hiệu" },
    { AccountType: 7, AccountTypeName: "Lái xe" },
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
    { RegistrationStatusType: 1, RegistrationStatusName: "Thư ký lập đơn" },
    { RegistrationStatusType: 2, RegistrationStatusName: "Trưởng khoa duyệt" },
    { RegistrationStatusType: 3, RegistrationStatusName: "Trưởng khoa hủy" },
    { RegistrationStatusType: 4, RegistrationStatusName: "Phòng quản trị duyệt" },
    { RegistrationStatusType: 5, RegistrationStatusName: "Phòng quản trị hủy" },
    { RegistrationStatusType: 6, RegistrationStatusName: "Chờ trường duyệt" },
    { RegistrationStatusType: 7, RegistrationStatusName: "trường duyệt" },
    { RegistrationStatusType: 8, RegistrationStatusName: "Trường không duyệt" },
    { RegistrationStatusType: 9, RegistrationStatusName: "Đang thực hiện" },
    { RegistrationStatusType: 10, RegistrationStatusName: "Hoàn thành" },
];
//Trang thái đơn sửa chữa
var RepairStatus = [
    { RepairStatusType: 0, RepairStatusName: "Chờ duyệt" },
    { RepairStatusType: 1, RepairStatusName: "Đã duyệt" },
    { RepairStatusType: 2, RepairStatusName: "Không duyệt" },
]
var Time = [
    // am
    { TimeValues: "1:00", TimeName: "1:00 AM" },
    { TimeValues: "1:30", TimeName: "1:30 AM" },
    { TimeValues: "2:00", TimeName: "2:00 AM" },
    { TimeValues: "2:30", TimeName: "2:30 AM" },
    { TimeValues: "3:00", TimeName: "3:00 AM" },
    { TimeValues: "3:30", TimeName: "3:30 AM" },
    { TimeValues: "4:00", TimeName: "4:00 AM" },
    { TimeValues: "4:30", TimeName: "4:30 AM" },
    { TimeValues: "5:00", TimeName: "5:00 AM" },
    { TimeValues: "5:30", TimeName: "5:30 AM" },
    { TimeValues: "6:00", TimeName: "6:00 AM" },
    { TimeValues: "6:30", TimeName: "6:30 AM" },
    { TimeValues: "7:00", TimeName: "7:00 AM" },
    { TimeValues: "7:30", TimeName: "7:30 AM" },
    { TimeValues: "8:00", TimeName: "8:00 AM" },
    { TimeValues: "8:30", TimeName: "8:30 AM" },
    { TimeValues: "9:00", TimeName: "9:00 AM" },
    { TimeValues: "9:30", TimeName: "9:30 AM" },
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
   
 
   