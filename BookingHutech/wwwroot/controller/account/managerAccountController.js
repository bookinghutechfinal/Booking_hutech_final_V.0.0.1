
mainmodule.controller('ManagerAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account',
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
        $scope.goToLogin = function () {
            $state.go('login');
            return;
        };

        $scope.ShowAccountInfo = {
            FullName: null,
            Gender: null,
            BirthDay: null,
            Addres: null,
            AccountType: null
        }

        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 2:
                //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                $scope.goToChangePassword();
                break;
            case 3:
                $scope.ShowAccountInfo = {
                    FullName: AccountInfo.ObjAccountInfo.FullName,
                    Gender: AccountInfo.ObjAccountInfo.Gender,
                    Birthday: AccountInfo.ObjAccountInfo.Birthday,
                    Addres: AccountInfo.ObjAccountInfo.Addres,
                    AccountType: AccountInfo.ObjAccountInfo.AccountType
                }
                break;
            case 1:
                $scope.goToLogin();
                break;

        }
          
    }]);  