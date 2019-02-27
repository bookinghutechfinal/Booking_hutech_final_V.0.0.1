 
mainmodule.controller('LoginController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao',  
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao) {
        $scope.UserName = "Trần Nhựt Anh";
        $scope.goToHome = function () {
            $state.go('main.home');
            return;
        };
        $scope.Login = function () {
            $scope.goToHome();
        }


    }]);  