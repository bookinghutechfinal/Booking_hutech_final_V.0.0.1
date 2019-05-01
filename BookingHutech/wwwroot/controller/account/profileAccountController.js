
mainmodule.controller('ProfileAccountController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'NgTableParams', '$account', '$alert', '$modal', 'AccountIDRequest',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, NgTableParams, $account, $alert, $modal, AccountIDRequest) {

        var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
        $scope.Titile = "Chi tiết tài xế";
        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        // Xem chi tiết profile account.
        $scope.Init = function () {
            var AccountDriverDetailResponseModel = null;
            var AccountRoleDriverResponseModel = null;
            $scope.tableParams1 = $scope.tableParams1 = null;
            $scope.ListRole = [];
            try {
                var testCookies = AccountInfo.Account_ID;
            } catch (e) {
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                $modalInstance.close();
                toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
                $state.go("login");
            }

            // Lấy chi tiết account. 
            $scope.Account_IDRequest = {
                Account_ID: AccountIDRequest,
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
                            Birthday: moment(AccountDriverDetailResponseModel.Birthday, 'YYYY-MM-DD').format('DD-MM-YYYY'),
                            NumberPhone: AccountDriverDetailResponseModel.NumberPhone,
                            Addres: AccountDriverDetailResponseModel.Addres,
                            Email: AccountDriverDetailResponseModel.Email,
                            CreateDate: AccountDriverDetailResponseModel.CreateDate,
                            Account_Status: AccountDriverDetailResponseModel.Account_Status,
                            Verify: AccountDriverDetailResponseModel.Verify,
                            IsChangePassword: AccountDriverDetailResponseModel.IsChangePassword,
                            LastModifiedDate: AccountDriverDetailResponseModel.LastModifiedDate,
                            AccountType: AccountDriverDetailResponseModel.AccountType, // cập nhật loại tài khoản
                            AccountTypeName: ConvertAccountTypeIDToName(AccountDriverDetailResponseModel.AccountType), // cập nhật loại tài khoản
                            Unit_ID: AccountDriverDetailResponseModel.Unit_ID,
                            UnitName: AccountDriverDetailResponseModel.UnitName,
                            Manager: AccountDriverDetailResponseModel.Manager,
                            EmailManager: AccountDriverDetailResponseModel.EmailManager,
                            NumberPhoneManager: AccountDriverDetailResponseModel.NumberPhoneManager,
                            DriverLicenseNo: AccountDriverDetailResponseModel.DriverLicenseNo,
                            LicenseClass: AccountDriverDetailResponseModel.LicenseClass,
                            LicenseExpires: moment(AccountDriverDetailResponseModel.LicenseExpires, 'YYYY-MM-DD').format('DD-MM-YYYY'),
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
        $scope.Init();

        // Button chỉnh sửa thông tin account.  
        $scope.EditProfileAccount = function () {
            $modalInstance.close();
            if ($rootScope.CheckCookies()) {
                var modalInstance = $modal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/wwwroot/views/pages/account/popupEditProfileAccount.html',
                    controller: 'EditProfileAccountController',
                    controllerAs: 'content',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        EditProfileRequestData: function () {
                            return $scope.AccountDriverDetail;
                        },
                    }
                });
                modalInstance.result.then(function (result) {
                    if ($rootScope.CheckCookies()) {
                        // Lấy chi tiết account. 
                        var modalInstance = $modal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/wwwroot/views/pages/account/popupProfileAccount.html',
                            controller: 'ProfileAccountController',
                            controllerAs: 'content',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                AccountIDRequest: function () {
                                    return AccountInfo.Account_ID;
                                },
                            }
                        });
                        modalInstance.result.then(function () {

                        });
                    }
                });
            } else {
                $modalInstance.close();
            }
        }
    }]);  