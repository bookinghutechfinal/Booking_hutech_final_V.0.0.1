
mainmodule.controller('LogoutController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$account', '$modalInstance',
    function ($scope, $state, $rootScope, $cookies, toastr, $account, $modalInstance) {

        $scope.goToLogin = function () {
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
            $state.go("login");
            return;
        };
        try {
            var AccountInfo = $account.getAccountInfo();
            $scope.reqLogout = {
                Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            }

        } catch (e) { 
            $modalInstance.close();
            $scope.goToLogin(); 
        }

        $scope.yes = function () {
            //*** Funciton 1: Gọi hàm logout 
            $account.Logout($scope.reqLogout, function (res) { 
                switch (res.data.ReturnCode) {
                    case 0:
                        toastr.error($rootScope.initMessage('LogoutFail'));
                        break;
                    case 1:
                        $modalInstance.close();
                        $cookies.remove('AccountInfo');
                        $cookies.remove("AccountInfoCheckPermissions");
                        $cookies.remove("myReload"); 
                        $state.go("login"); 
                        break;
                }

            });
        }

        $scope.close = function () {
            $modalInstance.close();
        }



    }]);  