
mainmodule.controller('ChangePasswordController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {

        $scope.goToLogin = function () {
            $state.go('login');
            return;
        };
        $scope.goToHome = function () {
            $state.go('main.home');
            return;
        };
        var AccountInfo = $account.getAccountInfo();
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 1:
                toastr.error("Vui lòng đăng nhập");
                $scope.goToLogin();
                break;
            case 2:
                $scope.AccountName = AccountInfo.ObjAccountInfo.FullName;
                break;
            case 3:
                $scope.goToHome();
                break;
        }

        $scope.enter = function ($event) {
            var keyCode = $event.keyCode;
            if (keyCode === 13) {
                $scope.btnChangePassword();
            }
        }
        $scope.btnLoginNewAccount = function () {
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            $state.go('login'); 
        }

        $scope.changeReq = {
            Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            Password: null,
            ConfirmPassWord: null, 
        }
          
        // đổi mật khẩu cho lần đầu tiên đăng nhập 
        $scope.btnChangePassword = function () {
            $scope.IsSubmiting = true;
            // Login Response
           
            // Check UserName && password != null
            var result = CheckDataChangePassword($scope.changeReq);
            switch (result) {
                case 139:
                    toastr.error("Vui lòng nhập mật khẩu mới"); //$rootScope.initMessage('PleaseInputAccountName')
                    return;
                    break;
                case 140:
                    toastr.error("Vui lòng xác nhận lại mật khẩu");
                    return;
                    break;
                case 141:
                    toastr.error("Xác nhận mật khẩu không khớp. Vui lòng kiểm tra lại!");
                    return;
                    break;
            } 
            $account.ChangePassword($scope.changeReq, function (response) {
                switch (response.data.ReturnCode) {  
                    case 152:
                        toastr.error($rootScope.initMessage('PasswordError'));
                        break;
                    case 153:
                        toastr.error($rootScope.initMessage('NotVerify'));
                        break;
                    case 154:
                        toastr.error($rootScope.initMessage('PasswordAlreadyExist'));
                        break; 
                    case 1:
                        $scope.PutCookies = function () {
                            var ObjAccountInfo = response.data.Data.GetAccountInfo[0];
                            var ObjRoleCode = response.data.Data.GetRoleCode;
                            $cookies.putObject("AccountInfoCheckPermissions", ObjAccountInfo);
                            $cookies.putObject("AccountInfo", {
                                ObjAccountInfo,
                                ObjRoleCode
                            });  // thông tin accunt login 
                            $cookies.put('myReload', 1);
                        }
                        $scope.PutCookies();
                        toastr.success($rootScope.initMessage('LoginSuccess'));
                        // kiểm tr loại tài khoản
                        // 2. trưởng khoa -> Quản lý hồ sơ....
                        // 1. thư ký khoa  -> Trang chủ. 
                        var result = CheckAccountType(response.data.Data.GetAccountInfo[0].AccountType);
                        switch (result) {
                            case 1:
                                $scope.goToHome();
                                break;
                            case 2: // đổi lại sau. 
                                $scope.goToHome();
                                break;
                        }
                        break;


                }
            });

        }


    }]);  