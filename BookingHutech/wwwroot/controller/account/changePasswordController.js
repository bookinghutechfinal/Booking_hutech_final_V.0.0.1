﻿
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
        //var AccountInfo = $account.getAccountInfo();
        var AccountInfo = $cookies.getObject('AccountInfo');
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 1:
                toastr.error("Vui lòng đăng nhập");
                $scope.goToLogin();
                break;
            case 2:
                $scope.AccountName = AccountInfo.FullName;
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
            $state.go('login'); 
        }

        $scope.changeReq = {
            Account_ID: AccountInfo.Account_ID,
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
                        $account.RemoveAccountInfo(); 
                        var ObjAccountInfo = response.data.Data.GetAccountInfo[0];
                        var ObjRoleCode = [];
                        for (var i = 0; i < response.data.Data.GetRoleCode.length; i++) {
                            var RoleCode = {
                                RoleCode: null
                            }
                            var RoleCode = {
                                RoleCode: response.data.Data.GetRoleCode[i].RoleCode,
                            }
                            ObjRoleCode.push(RoleCode);
                        }
                        $cookies.putObject("AccountInfo", ObjAccountInfo);
                        $cookies.putObject("RoleCode", ObjRoleCode);

                        var audio = new Audio('../../audio/alert_message_audio.mp3');
                        audio.play();
                        audio.volume = 0.1; 
                        toastr.success($rootScope.initMessage('ChangepassSuccess'));
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