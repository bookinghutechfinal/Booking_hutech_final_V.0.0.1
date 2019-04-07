
mainmodule.controller('ProfileAccountController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'NgTableParams', '$account', '$alert',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, NgTableParams, $account, $alert) {
        // AccountInfoDatailRequest: Tham số nhận dữ liệu từ màn hình quản lý lái xe.   
        $scope.Titile = "Chi tiết tài xế";
        $scope.ClosePopup = function () {
            $modalInstance.close();
            location.reload();
        }
        // hám khởi tạo tất cả giá trị; 
        $scopeInit = function () {
            var AccountDriverDetailResponseModel = null;
            var AccountRoleDriverResponseModel = null;
            $scope.tableParams1 = $scope.tableParams1 = null;
            $scope.ListRole = [];
        }
       

        $scope.Main = function () { 
            $scopeInit();
            // kiểm tra session
            try {
                var AccountInfo = $account.getAccountInfo();
                // Lấy chi tiết account. 
                $scope.Account_IDRequest = {
                    Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
                }
                $account.ManagerGetDetailAccountByAccountID($scope.Account_IDRequest, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:

                            var AccountDriverDetailResponseModel = res.data.Data.GetAccountInfo[0];
                            var AccountRoleDriverResponseModel = res.data.Data.GetRoleCode;
                            // hiển thị thông tin tài khoản lên giao diện
                            $scope.AccountDriverDetail = {
                                Avatar: AccountDriverDetailResponseModel.Avatar,
                                Account_ID: AccountDriverDetailResponseModel.Account_ID,
                                FullName: AccountDriverDetailResponseModel.FullName,
                                Gender: AccountDriverDetailResponseModel.Gender,
                                Birthday: AccountDriverDetailResponseModel.Birthday,
                                NumberPhone: AccountDriverDetailResponseModel.NumberPhone,
                                Addres: AccountDriverDetailResponseModel.Addres,
                                Email: AccountDriverDetailResponseModel.Email,
                                CreateDate: AccountDriverDetailResponseModel.CreateDate,
                                Account_Status: AccountDriverDetailResponseModel.Account_Status,
                                Verify: AccountDriverDetailResponseModel.Verify,
                                IsChangePassword: AccountDriverDetailResponseModel.IsChangePassword,
                                AccountType: AccountDriverDetailResponseModel.AccountType,
                                UnitName: AccountDriverDetailResponseModel.UnitName,
                                Manager: AccountDriverDetailResponseModel.Manager,
                                EmailManager: AccountDriverDetailResponseModel.EmailManager,
                                NumberPhoneManager: AccountDriverDetailResponseModel.NumberPhoneManager,
                                DriverLicenseNo: AccountDriverDetailResponseModel.DriverLicenseNo,
                                LicenseClass: AccountDriverDetailResponseModel.LicenseClass,
                                LicenseExpires: AccountDriverDetailResponseModel.LicenseExpires,
                            }

                            //Cập nhật loại tài khoản 
                            if ($scope.AccountDriverDetail.AccountType === "1") {
                                $scope.AccountDriverDetail.AccountType = AccountTypeRequest[0].AccountTypeName;
                            }
                            if ($scope.AccountDriverDetail.AccountType === "2") {
                                $scope.AccountDriverDetail.AccountType = AccountTypeRequest[1].AccountTypeName;
                            }
                            if ($scope.AccountDriverDetail.AccountType === "3") {
                                $scope.AccountDriverDetail.AccountType = AccountTypeRequest[2].AccountTypeName;
                            }
                            if ($scope.AccountDriverDetail.AccountType === "4") {
                                $scope.AccountDriverDetail.AccountType = AccountTypeRequest[3].AccountTypeName;
                            }
                            if ($scope.AccountDriverDetail.AccountType === "5") {
                                $scope.AccountDriverDetail.AccountType = AccountTypeRequest[4].AccountTypeName;
                            }
                            if ($scope.AccountDriverDetail.AccountType === "7") {
                                $scope.AccountDriverDetail.AccountType = AccountTypeRequest[5].AccountTypeName;
                            }

                            //Cập nhật giới tính
                            if ($scope.AccountDriverDetail.Gender === 1) {
                                $scope.AccountDriverDetail.Gender = "Nam";
                            } else {
                                $scope.AccountDriverDetail.Gender = "Nữ";
                            }

                            $scope.tableParams1 = new NgTableParams({}, { dataset: AccountRoleDriverResponseModel });

                            break;
                    }

                });
            }
            catch (err) {
                toastr.error("Hệ thống có lỗi xử lý!");
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions"); 
              //  location.reload();
             
                //$state.go('login');
              
            } 

        }
        $scope.Main();

    }]);  