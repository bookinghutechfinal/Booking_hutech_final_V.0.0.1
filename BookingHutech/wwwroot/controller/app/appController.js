// Quản lý các cấu trúc của trang web [herder, menu, fooder, main]
mainmodule.controller('AppController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao) {

        $scope.titleMain = "Hello page app";
        $scope.menu = false;
        $scope.Version = "1.1";
        $rootScope.UserName = "Trần Nhựt Anh";

        $rootScope.isLogin = true; 

        $scope.goToLogin = function () {
            $state.go('main.login');
            return;
        };

        $scope.UserNamne = "aa";
        if ($scope.UserNamne === "") { 
            $rootScope.isLogin = false;  
            $scope.goToLogin(); 
       }

    }]);