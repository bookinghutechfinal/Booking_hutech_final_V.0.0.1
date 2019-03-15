
mainmodule.controller('ManagerDriverController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $modal) {

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


        


        // Lấy chi tiết tài khoản của admin và chi tiết quyền. 
        $scope.ManagerGetListDriver = function () {
            $account.ManagerGetListDriverByDriverStatus({}, function (res) {
                debugger
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ManagerGetListDriverResponse = res.data.Data.GetDriverInfo;
                        //var RoleResponse = res.data.Data.GetRoleCode; 
                        //// Hiển thị thông tin account
                        //$scope.ShowAccountInfo = {
                        //    FullName: AccountInfoResponse.FullName,
                        //    Gender: AccountInfoResponse.Gender,
                        //    Birthday: AccountInfoResponse.Birthday,
                        //    Addres: AccountInfoResponse.Addres,
                        //    AccountType: AccountInfoResponse.AccountType,
                        //    NumberPhone: AccountInfoResponse.NumberPhone,
                        //    Email: AccountInfoResponse.Email,
                        //    UnitName: AccountInfoResponse.UnitName,
                        //} 
                        ////Cập nhật trạng thái cho quyền. 
                        //for (var i = 0; i < RoleResponse.length; i++) {
                        //    // AccountStatusName
                        //    if (RoleResponse[i].RoleDetail_Status === false) {
                        //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[0].RoleStatusName;
                        //    } else {
                        //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[1].RoleStatusName;
                        //    }

                        //}
                        //// Hiển thị thông tin quyền  
                        break;
                }

            });
        }

        $scope.main = function () {
            $scope.ManagerGetListDriverResponse = [];
            $scope.ManagerGetListDriver()
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
         

        // Lấy thông tin chi tiết lái xe. 
        $scope.ShowDetailDriver = function (Request) {
            $scope.Account_IDRequest = {
                Account_ID: Request,
            }

            $account.ManagerGetDetailAccountByAccountID($scope.Account_IDRequest, function (res) {
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
                       
                        // Truyền dự liệu qua popup. 
                        $scope.AccountInfoDatail = {
                            AccountInfo: AccountInfoResponse,
                            RoleInfo: RoleResponse
                        }
                        $scope.OpenPopupDetailDriver($scope.AccountInfoDatail); 
                        break;
                }

            });

        }

        // Mỡ popup xem chi tiết 1 lái xe. 
        $scope.OpenPopupDetailDriver = function (AccountInfoDatailRequest) {
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupDetailDriver.html',
                controller: 'DetailDriverController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    AccountInfoDatailRequest: function () {
                        return AccountInfoDatailRequest;
                    },
                }
            });
            modalInstance.result.then(function () {

            });
        }

        // Mở popup thêm mới lái xe . 
        $scope.ManagerOpenpopupAddNewDriver  = function() {
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewDriver.html',
                controller: 'ManagerAddNewDriverController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    Request: function () {
                        return null;
                    },
                }
            });
            modalInstance.result.then(function () {

            });
        }


    }]);  

// Thêm mới lái xe. 
mainmodule.controller('ManagerAddNewDriverController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal','$modalInstance',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $modal, $modalInstance) {

        //var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 
        //$scope.goToHome = function () {
        //    $state.go('main.home');
        //    return;
        //};
        //$scope.goToChangePassword = function () {
        //    $state.go('changePassword');
        //    return;
        //};
        //$scope.goToLogin = function () {
        //    $state.go('login');
        //    return;
        //};

        $scope.ClosePopup = function () {
            $modalInstance.close();
           
        }



        // Lấy chi tiết tài khoản của admin và chi tiết quyền. 
        //$scope.ManagerGetListDriver = function () {
        //    $account.ManagerGetListDriverByDriverStatus({}, function (res) {
        //        debugger
        //        switch (res.data.ReturnCode) {
        //            case 1:
        //                $scope.ManagerGetListDriverResponse = res.data.Data.GetDriverInfo;
        //                //var RoleResponse = res.data.Data.GetRoleCode; 
        //                //// Hiển thị thông tin account
        //                //$scope.ShowAccountInfo = {
        //                //    FullName: AccountInfoResponse.FullName,
        //                //    Gender: AccountInfoResponse.Gender,
        //                //    Birthday: AccountInfoResponse.Birthday,
        //                //    Addres: AccountInfoResponse.Addres,
        //                //    AccountType: AccountInfoResponse.AccountType,
        //                //    NumberPhone: AccountInfoResponse.NumberPhone,
        //                //    Email: AccountInfoResponse.Email,
        //                //    UnitName: AccountInfoResponse.UnitName,
        //                //} 
        //                ////Cập nhật trạng thái cho quyền. 
        //                //for (var i = 0; i < RoleResponse.length; i++) {
        //                //    // AccountStatusName
        //                //    if (RoleResponse[i].RoleDetail_Status === false) {
        //                //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[0].RoleStatusName;
        //                //    } else {
        //                //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[1].RoleStatusName;
        //                //    }

        //                //}
        //                //// Hiển thị thông tin quyền  
        //                break;
        //        }

        //    });
        //}

        //$scope.main = function () {
        //    $scope.ManagerGetListDriverResponse = [];
        //    $scope.ManagerGetListDriver()
        //}

        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        //var result = CheckAccountLoginAndChangePass(AccountInfo);
        //switch (result) {
        //    case 2:
        //        //toastr.success($rootScope.initMessage('MessageChangeAccount'));
        //        $scope.goToChangePassword();
        //        break;
        //    case 3:
        //        $scope.main()
        //        break;
        //    case 1:
        //        $scope.goToLogin();
        //        break;

        //}


        // Lấy thông tin chi tiết lái xe. 
        //$scope.ShowDetailDriver = function (Request) {
        //    $scope.Account_IDRequest = {
        //        Account_ID: Request,
        //    }

        //    $account.ManagerGetDetailAccountByAccountID($scope.Account_IDRequest, function (res) {
        //        debugger
        //        switch (res.data.ReturnCode) {
        //            case 1:

        //                var AccountInfoResponse = res.data.Data.GetAccountInfo[0];
        //                var RoleResponse = res.data.Data.GetRoleCode;
        //                // Hiển thị thông tin account
        //                $scope.ShowAccountInfo = {
        //                    FullName: AccountInfoResponse.FullName,
        //                    Gender: AccountInfoResponse.Gender,
        //                    Birthday: AccountInfoResponse.Birthday,
        //                    Addres: AccountInfoResponse.Addres,
        //                    AccountType: AccountInfoResponse.AccountType,
        //                    NumberPhone: AccountInfoResponse.NumberPhone,
        //                    Email: AccountInfoResponse.Email,
        //                    UnitName: AccountInfoResponse.UnitName,
        //                }

        //                // Truyền dự liệu qua popup. 
        //                $scope.AccountInfoDatail = {
        //                    AccountInfo: AccountInfoResponse,
        //                    RoleInfo: RoleResponse
        //                }
        //                $scope.OpenPopupDetailDriver($scope.AccountInfoDatail);
        //                break;
        //        }

        //    });

        //}

        


    }]);  