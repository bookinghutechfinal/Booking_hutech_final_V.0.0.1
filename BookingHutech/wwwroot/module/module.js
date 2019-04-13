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
]

