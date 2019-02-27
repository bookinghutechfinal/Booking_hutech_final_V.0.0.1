 
mainmodule.controller('ChangePasswordController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao',  
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao) {
        $scope.UserName = "Trần Nhựt Anh";
        $scope.goToHome = function () {
            debugger
            $state.go('main.home');
            return;
        };
        $scope.ChangePassword = function () {
            $scope.goToHome();
        }


    }]);  