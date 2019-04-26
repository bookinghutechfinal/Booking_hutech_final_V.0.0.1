
mainmodule.controller('LogoutController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$account', '$modalInstance',
    function ($scope, $state, $rootScope, $cookies, toastr, $account, $modalInstance) {


        $scope.yes = function () {
            $modalInstance.close();
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            $state.go("login");
            //try {
            //    var AccountInfo = $account.getAccountInfo();
            //    $scope.reqLogout = {
            //        Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            //    }
            //    //*** Funciton 1: Gọi hàm logout 
            //    $account.Logout($scope.reqLogout, function (res) {
            //        switch (res.data.ReturnCode) {
            //            case 0:
            //                toastr.error($rootScope.initMessage('LogoutFail'));
            //                break;
            //            case 1:
            //                $modalInstance.close();
            //                $cookies.remove('AccountInfo');
            //                $cookies.remove("AccountInfoCheckPermissions");
            //                $cookies.remove("myReload");
            //                $state.go("login");
            //                break;
            //        }

            //    });
            //} catch (e) {
            //    $modalInstance.close();
            //    $cookies.remove('AccountInfo');
            //    $cookies.remove("AccountInfoCheckPermissions");
            //    $cookies.remove("myReload");
            //    $state.go("login");
            //}

        }

        $scope.close = function () {
            $modalInstance.close();
        }



    }]);  