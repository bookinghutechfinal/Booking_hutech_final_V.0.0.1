 
mainmodule.controller('LoginController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao',  
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao) {
        $scope.UserName = "Trần Nhựt Anh";
        $scope.goToHome = function () {
            $state.go('main.home');
            return;
        };
        $scope.Login = function () {
            // Login Response
            $scope.accountLoginRequest = {
                UserName: $scope.UserName,
                Password: $scope.Password,
            }
            // Check UserName && password != null
            var CheckDataLoginResponse = CheckDataLogin($scope.accountLoginRequest);
            switch (CheckDataLoginResponse) {
                case 137:
                    toastr.error($rootScope.initMessage('PleaseInputAccountName'));
                    return;
                    break;
                case 138:
                    toastr.error($rootScope.initMessage('PleaseInputPassword'));
                    return;
                    break;
            }

            $scope.goToHome();
        }


    }]);  