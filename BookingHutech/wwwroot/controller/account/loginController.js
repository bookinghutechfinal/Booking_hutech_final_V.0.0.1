 
mainmodule.controller('LoginController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao','$account',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {
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
            $account.Login($scope.accountLoginRequest, function (response) { 
                switch (response.data.ReturnCode) {
                    case 2:
                        toastr.error($rootScope.initMessage('LoginFail'));
                        break;
                    case 1:
                        toastr.success($rootScope.initMessage('LoginSuccess'));
                        $scope.goToHome();
                        break; 
                }
            });

          
        }


    }]);  