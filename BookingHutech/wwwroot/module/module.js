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
    { Account_Status: 1, Account_StatusName: "Hoạt động" },
    { Account_Status: 2, Account_StatusName: "Khóa" }, 
]
