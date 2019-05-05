// Thêm mới tài khoản 
mainmodule.controller('ManagerCreateNewAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal', '$modalInstance', '$alert',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $modal, $modalInstance, $alert) {

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

                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ManagerGetListUnitResponse = res.data.Data.ListUnit;
                        $scope.GetRole();
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
                "Password": "Bookinghutech@123",
                "Unit_ID": null,
                "AccountType": null,
                "DriverLicenseNo": null,
                "LicenseClass": null,
                "LicenseExpires": null,
                "Avatar": null,
            };
            // img 
            $scope.ImageModel = {
                CHAN_DUNG: {
                    ImageName: 1,
                    ImageData: {
                        compressed: {
                            dataURL: null
                        }
                    },
                },
            }
            $scope.AccountType = AccountTypeRequest;
            $scope.ManagerGetListUnitResponse = [];
            $scope.ManagerGetListUnit();
            $scope.tableParams2 = $scope.tableParams2 = null;
        }

        var RoleRequest = [];
        // Hàm 2: Lấy ds quyền chưa cấp cho account
        $scope.GetRole = function () {
            var Account_IDRequest = {
                Account_ID: '',
            }
            $account.ManagerGetDetailRoleAccountByAccountID(Account_IDRequest, function (res) {

                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ListRole = res.data.Data.RoleMasterByAccountID;
                        $scope.tableParams2 = new NgTableParams({}, { dataset: $scope.ListRole });
                        break;
                }

            });
        }

        // Cập nhật chọn quyền để cấp
        $scope.updateCheck = function (RoleMasterIDRequest) {
            CheckRole = {
                RoleMaster_ID: RoleMasterIDRequest,
                Account_ID: null,
                FullNameUpdate: AccountInfo.FullName,
                RoleDetail_Status: true
            }
            for (var i = 0; i < RoleRequest.length; i++) {
                if (RoleRequest[i].RoleMaster_ID == RoleMasterIDRequest) {
                    RoleRequest.splice(i, 1);
                    $scope.TestInputChange($scope.CreateNewAccountmModel);
                    return;
                }
            }
            RoleRequest.push(CheckRole);
            $scope.TestInputChange($scope.CreateNewAccountmModel);
        };

        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 2:
                //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                $scope.ClosePopup();
                $scope.goToChangePassword();
                break;
            case 3:
                $scope.ClosePopup();
                $scope.main()
                break;
            case 1:
                if ($rootScope.CheckCookies()) {
                } else {
                    $modalInstance.close(); 
                }
                break;

        }
        $scope.test = function () {
            $scope.CreateNewAccountmModel.AccountType = "";
            $scope.isDriver = false;
        }
        $scope.btndisabled = true;
        $scope.isDriver = false;
        $scope.isShowQuanTri = 0;
        $scope.isShowBGH = 0;
        $scope.isShowLaiXe = 0;
        $scope.isShowKhoaVien = 0;
        $scope.TestInputChange = function (Request) {
            $scope.isShowQuanTri = 0;
            $scope.isShowBGH = 0;
            $scope.isShowLaiXe = 0;
            $scope.isShowKhoaVien = 0;

            if (Request.Unit_ID == "2") {
                $scope.isShowQuanTri = 2;
            }
            if (Request.Unit_ID == "3") {
                $scope.isShowBGH = 3;
            }
            if (Request.Unit_ID == "4") {
                $scope.isShowLaiXe = 4;
            } else {
                $scope.isShowKhoaVien = 1;
            }
            // check show theo loại tài khoa
            if (Request.AccountType === "7") {
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
                } else if (RoleRequest.length == 0) {
                    $scope.btndisabled = true;
                    return;
                }
                else {
                    $scope.btndisabled = false;
                }
            }

            if (Request.AccountType !== "7") {
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
                } else if (RoleRequest.length==0) {
                    $scope.btndisabled = true;
                    return;
                }
                else {
                    $scope.btndisabled = false;
                }


            }


        }
        // check upload hình 
        $scope.CheckUploatImg = function (imgURL) {
            if (checkNull(imgURL)) {
                $scope.btndisabled = true;
                return;
            }
            else {
                $scope.btndisabled = false;
            }
        }
        $scope.removeImage = function () {
            $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL = "";
        }

        // Lấy thông tin chi tiết lái xe. 
        $scope.CeateNewAccount = function (imgUrl) {
            if ($rootScope.CheckCookies()) {
                $scope.CreateNewAccountmModel.Avatar = imgUrl;
                if (checkNull(imgUrl)) {
                    toastr.error("Vui lòng chọn ảnh!")
                    return;
                }
                let AddNewAccountRequestModel = {
                    createNewAccountRequestModel: $scope.CreateNewAccountmModel,
                    updateRoleRequestModel: RoleRequest,
                }
                $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn thêm người dùng này'), function () {
                    $account.ManagerCreateNewAccount(AddNewAccountRequestModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                // $state.go('Admin.ProductManager');
                                toastr.success("Đã thêm thành công");
                                //$state.reload();
                                break;
                        }
                    });
                });
            } else {
                $modalInstance.close();
            } 
        }

        // xóa hình
        $scope.removeImage = function () {
            $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL = "";
        }


    }]);

// upload hình  
