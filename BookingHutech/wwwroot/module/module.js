var mainmodule = angular.module('BHutechAppModule',
    [
        'ngIdle',              /*session*/
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        'ui.bootstrap',
        'ui.router',
        'oc.lazyLoad',
        'ngTable',
        'pascalprecht.translate',
        'ngTable',            /*ng-table*/
        'toastr',              /*toastr show messeger*/
        'textAngular',
        'ng-fusioncharts',  /*Anh Create 14/3/2019*/
    ]);

//var teamplate = {
//    header: 'wwwroot/views/common/header.html',
//    sidebar: 'wwwroot/views/common/sidebar-menu.html',
//    footer: 'wwwroot/views/common/footer.html',
//};

var AccountTypeRequest = [
    { AccountType: 1, AccountTypeName: "Thư ký" },
    { AccountType: 2, AccountTypeName: "Trưởng khoa" },
    { AccountType: 3, AccountTypeName: "Văn phòng trường" },
    { AccountType: 4, AccountTypeName: "Ban giám hiệu" },
    { AccountType: 5, AccountTypeName: "Lái xe" },
]
