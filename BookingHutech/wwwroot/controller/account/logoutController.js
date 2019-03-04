
mainmodule.controller('LogoutController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$account', '$modalInstance',
    function ($scope, $state, $rootScope, $cookies, toastr, $account, $modalInstance) {

        var AccountInfo = $account.getAccountInfo();
        $scope.goToLogin = function () {
            //$cookies.remove("AccountInfo");
            //$cookies.remove("AccountInfo_");
            //$cookies.remove("ObjRoleCode");
            $account.RemoveAccountInfo();
            $scope.close();
            $state.go('login');
        };

        $scope.close = function () {
            $modalInstance.close();
        }
        $scope.yes = function () {
            if (checkNull(AccountInfo) === true) {
                $scope.goToLogin();
                return;
            }
            $scope.reqLogout = {
                Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            }

            //*** Funciton 1: Gọi hàm logout 
            $account.Logout($scope.reqLogout, function (res) {

                switch (res.data.ReturnCode) {
                    case 0:
                        toastr.error($rootScope.initMessage('LogoutFail'));
                        break;
                    case 1:
                        $modalInstance.close();
                        $scope.goToLogin();
                        break;
                }

            });
        }


    }]);  