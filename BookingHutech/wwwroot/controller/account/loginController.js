﻿  
 
mainmodule.controller('LoginController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 
        $scope.goToHome = function () {
            $state.go('main.home');
            return;
        };
        $scope.goToChangePassword = function () {
            $state.go('changePassword');
            return;
        };
        $rootScope.isLoading = false; 
        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 2:
                //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                $scope.goToChangePassword();
                break;
            case 3:
                $rootScope.isLoading = true; 
                //location.reload();  
                $scope.goToHome();
                break;
            case 1:
                //$modalInstance.close();
                break;

        }



        $scope.enter = function ($event) {
            var keyCode = $event.keyCode;
            if (keyCode === 13) {
                $scope.Login();
            }
        }

        $scope.Login = function () {
            $scope.IsSubmiting = true;
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
                    case 152:
                        toastr.error($rootScope.initMessage('LoginFail'));
                        break;
                    case 102:
                        toastr.error($rootScope.initMessage('AccountDelete'));
                        break;
                    case 153:
                        toastr.error($rootScope.initMessage('NotVerify'));
                        break;
                    case 135:
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
                        //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                        $scope.PutCookies();
                        $scope.goToChangePassword(); // đổi pass word. 
                        toastr.success($rootScope.initMessage('LoginSuccess'));
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