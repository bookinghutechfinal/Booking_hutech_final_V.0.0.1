// Thêm mới tài khoản 
mainmodule.controller('ManagerCreateNewAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal', '$modalInstance',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $modal, $modalInstance) {

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

        $scope.ClosePopup = function () {
            $modalInstance.close();

        }

        // Lấy danh sách đơn vị/ khoa, viện phòng ban.  
        $scope.ManagerGetListUnit = function () {
            $account.ManagerGetUnit({}, function (res) {
                debugger
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ManagerGetListUnitResponse = res.data.Data.ListUnit;
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
            // show messager 
            $scope.ipFullName = false;
            // model
            $scope.CreateNewAccountmModel = {
                "FullName": null,
                "NumberPhone": null,
                "Email": null,
                "Addres": null,
                "Gender": null,
                "BirthDay": null,
                "UserName": null,
                "Password": null,
                "Unit_ID": null,
                "AccountType": null,
                "DriverLicenseNo": null,
                "LicenseClass": null,
                "LicenseExpires": null,
            };
            //$scope.AccountTypeRequest = [
            //    { AccountType: 1, AccountTypeName: "Thư ký" },
            //    { AccountType: 2, AccountTypeName: "Trưởng khoa" },
            //    { AccountType: 3, AccountTypeName:"Văn phòng trường" },
            //    { AccountType: 4, AccountTypeName: "Ban giám hiệu" },
            //]
            $scope.AccountType = AccountTypeRequest; 
            $scope.ManagerGetListUnitResponse = [];
            $scope.ManagerGetListUnit();
        }

        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 2:
                //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                $scope.ClosePopup();
                $scope.goToChangePassword();
                break;
            case 3:
                $scope.main()
                break;
            case 1:
                $scope.ClosePopup();
                $scope.goToLogin();
                break;

        }
        $scope.btndisabled = true;
        $scope.isDriver = false;
        $scope.TestInputChange = function (Request) {

            // check show theo loại tài khoa
            if (Request.AccountType === "5") {
                $scope.isDriver = true;
                if (checkNull(Request.DriverLicenseNo)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.LicenseClass)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.LicenseExpires)) {
                    $scope.btndisabled = true;
                    return;
                }  
                else {
                    $scope.btndisabled = false;
                }
            }

            if (Request.AccountType !== "5") {
                $scope.isDriver = false;
                // check data
                if (checkNull(Request.FullName)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Gender)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.NumberPhone)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Email)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Addres)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.BirthDay)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.UserName)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Password)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Unit_ID)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.AccountType)) {
                    $scope.btndisabled = true;
                    return;
                }
                else {
                    $scope.btndisabled = false;
                }
            } 
          
            
        }

        // Lấy thông tin chi tiết lái xe. 
        $scope.CeateNewAccount = function (Request) { 
            var CreateNewAccountmModelRequestModel = {
                "FullName": Request.FullName,
                "NumberPhone": Request.NumberPhone,
                "Email": Request.Email,
                "Addres": Request.Addres,
                "Gender": Request.Gender,
                "BirthDay": Request.BirthDay,
                "UserName": Request.UserName,
                "Password": Request.Password,
                "Unit_ID": Request.Unit_ID,
                "AccountType": Request.AccountType,
                "DriverLicenseNo": Request.DriverLicenseNo,
                "LicenseClass": Request.LicenseClass,
                "LicenseExpires": Request.LicenseExpires,
            };



            //$account.ManagerGetDetailAccountByAccountID($scope.Account_IDRequest, function (res) {
            //    debugger
            //    switch (res.data.ReturnCode) {
            //        case 1:

            //            var AccountInfoResponse = res.data.Data.GetAccountInfo[0];
            //            var RoleResponse = res.data.Data.GetRoleCode;
            //            // Hiển thị thông tin account
            //            $scope.ShowAccountInfo = {
            //                FullName: AccountInfoResponse.FullName,
            //                Gender: AccountInfoResponse.Gender,
            //                Birthday: AccountInfoResponse.Birthday,
            //                Addres: AccountInfoResponse.Addres,
            //                AccountType: AccountInfoResponse.AccountType,
            //                NumberPhone: AccountInfoResponse.NumberPhone,
            //                Email: AccountInfoResponse.Email,
            //                UnitName: AccountInfoResponse.UnitName,
            //            }

            //            // Truyền dự liệu qua popup. 
            //            $scope.AccountInfoDatail = {
            //                AccountInfo: AccountInfoResponse,
            //                RoleInfo: RoleResponse
            //            }
            //            $scope.OpenPopupDetailDriver($scope.AccountInfoDatail);
            //            break;
            //    }

            //});

        }



    }]);  