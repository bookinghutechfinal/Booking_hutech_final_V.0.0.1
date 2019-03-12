
mainmodule.controller('ManagerAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account','NgTableParams',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams) {
       
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
        $scope.RoleStatus = [
            {
                'RoleStatusName': 'Đã Khóa',
                'RoleStatusID': 0
            },
            {
                'RoleStatusName': 'Hoạt động',
                'RoleStatusID': 1
            },
        ];
         
           
        

        // Lấy chi tiết tài khoản của admin và chi tiết quyền. 
        $scope.GetDetailAccountInfoAndRole = function () {
            $scope.RequestAccountID = {
                Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            } 
            $scope.tableParams1 = $scope.tableParams1 = null;
            $account.ManagerGetDetailAccountByAccountID($scope.RequestAccountID, function (res) {
                debugger
                switch (res.data.ReturnCode) {  
                    case 1:
                        var AccountInfoResponse = res.data.Data.GetAccountInfo[0]; 
                        var RoleResponse = res.data.Data.GetRoleCode; 
                        // Hiển thị thông tin account
                        $scope.ShowAccountInfo = {
                            FullName: AccountInfoResponse.FullName,
                            Gender: AccountInfoResponse.Gender,
                            Birthday: AccountInfoResponse.Birthday,
                            Addres: AccountInfoResponse.Addres,
                            AccountType: AccountInfoResponse.AccountType,
                            NumberPhone: AccountInfoResponse.NumberPhone,
                            Email: AccountInfoResponse.Email,
                            UnitName: AccountInfoResponse.UnitName,
                        } 
                        //Cập nhật trạng thái cho quyền. 
                        for (var i = 0; i < RoleResponse.length; i++) {
                            // AccountStatusName
                            if (RoleResponse[i].RoleDetail_Status === false) {
                                RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[0].RoleStatusName;
                            } else {
                                RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[1].RoleStatusName;
                            }
                            
                        }
                        // Hiển thị thông tin quyền 
                        $scope.tableParams1 = new NgTableParams({}, { dataset: RoleResponse });
                        break;
                }

            });
        }

        $scope.main = function () {
            $scope.GetDetailAccountInfoAndRole()
        }

        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 2:
                //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                $scope.goToChangePassword();
                break;
            case 3:
                $scope.main()
                break;
            case 1:
                $scope.goToLogin();
                break;

        }
          
    }]);  