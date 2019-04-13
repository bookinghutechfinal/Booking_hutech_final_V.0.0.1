
mainmodule.controller('ProfileAccountController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'NgTableParams', '$account', '$alert','$modal',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, NgTableParams, $account, $alert, $modal) {
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
       
        // Xem chi tiết profile account.
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
                                LastModifiedDate: AccountDriverDetailResponseModel.LastModifiedDate,
                                AccountType: ConvertAccountTypeIDToName(AccountDriverDetailResponseModel.AccountType), // cập nhật loại tài khoản
                                Unit_ID: AccountDriverDetailResponseModel.Unit_ID,
                                UnitName: AccountDriverDetailResponseModel.UnitName,
                                Manager: AccountDriverDetailResponseModel.Manager,
                                EmailManager: AccountDriverDetailResponseModel.EmailManager,
                                NumberPhoneManager: AccountDriverDetailResponseModel.NumberPhoneManager,
                                DriverLicenseNo: AccountDriverDetailResponseModel.DriverLicenseNo,
                                LicenseClass: AccountDriverDetailResponseModel.LicenseClass,
                                LicenseExpires: AccountDriverDetailResponseModel.LicenseExpires,
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

        // Button chỉnh sửa thông tin account.  
        $scope.EditProfileAccount = function () {  
               //$modalInstance.close();
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
                modalInstance.result.then(function (EditAccountResult) {
                    if (!checkNull(EditAccountResult)) {
                        // Cập nhật lại thông tin account.
                        $scope.AccountDriverDetail.Avatar = EditAccountResult.Avatar; 
                        $scope.AccountDriverDetail.FullName = EditAccountResult.FullName; 
                        $scope.AccountDriverDetail.Gender = EditAccountResult.Gender; 
                        $scope.AccountDriverDetail.Birthday = EditAccountResult.Birthday; 
                        $scope.AccountDriverDetail.NumberPhone = EditAccountResult.NumberPhone; 
                        $scope.AccountDriverDetail.Addres = EditAccountResult.Addres; 
                        $scope.AccountDriverDetail.Email = EditAccountResult.Email; 
                        $scope.AccountDriverDetail.AccountType = ConvertAccountTypeIDToName(EditAccountResult.AccountType);  
                        $scope.AccountDriverDetail.DriverLicenseNo = EditAccountResult.DriverLicenseNo; 
                        $scope.AccountDriverDetail.LicenseClass = EditAccountResult.LicenseClass; 
                        $scope.AccountDriverDetail.LicenseExpires = EditAccountResult.LicenseExpires; 
                       // $scope.AccountDriverDetail.LastModifiedDate = ;  

                        //$scope.AccountDriverDetail = {
                        //    Avatar: EditAccountResult.Avatar,
                        //    //Account_ID: EditAccountResult.Account_ID,
                        //   // FullName: EditAccountResult.FullName,
                        //    //Gender: EditAccountResult.Gender,
                        //    //Birthday: EditAccountResult.Birthday,
                        //    //NumberPhone: EditAccountResult.NumberPhone,
                        //    Addres: EditAccountResult.Addres,
                        //    Email: EditAccountResult.Email,
                        //    // CreateDate: EditAccountResult.CreateDate,
                        //    //Account_Status: EditAccountResult.Account_Status,
                        //    //Verify: EditAccountResult.Verify,
                        //    // IsChangePassword: EditAccountResult.IsChangePassword,
                        //    //LastModifiedDate: EditAccountResult.LastModifiedDate,
                        //    AccountType: ConvertAccountTypeIDToName(EditAccountResult.AccountType), // cập nhật loại tài khoản
                        //    Unit_ID: EditAccountResult.Unit_ID,
                        //    //UnitName: EditAccountResult.UnitName,
                        //    // Manager: EditAccountResult.Manager,
                        //    //EmailManager: EditAccountResult.EmailManager,
                        //    //NumberPhoneManager: EditAccountResult.NumberPhoneManager,
                        //    DriverLicenseNo: EditAccountResult.DriverLicenseNo,
                        //    LicenseClass: EditAccountResult.LicenseClass,
                        //    LicenseExpires: EditAccountResult.LicenseExpires,
                        //}
                    } 

                });
            
        }
    }]);  