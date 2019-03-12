
mainmodule.controller('DetailDriverController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'AccountInfoDatailRequest',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, AccountInfoDatailRequest) {
        // AccountInfoDatailRequest: Tham số nhận dữ liệu từ màn hình quản lý lái xe.  
        var AccountDriverDetailResponseModel = AccountInfoDatailRequest;
        $scope.Titile = "Chi tiết tài xế";
        $scope.ClosePopup = function () { 
            $modalInstance.close();
        }
         
        $scope.Main = function () {

            var AccountStatus = [
                {
                    'AccountStatusName': 'Đã Khóa',
                    'AccountStatusID': 0
                },
                {
                    'AccountStatusName': 'Hoạt động',
                    'AccountStatusID': 1
                },
            ];
            var AccountType = [
                {
                    'AccountTypeName': 'Lái xe',
                    'AccountTypeID': 7
                },
                
            ]; 

            $scope.AccountDriverDetail = {
                Account_ID: AccountDriverDetailResponseModel.AccountInfo.Account_ID,
                FullName: AccountDriverDetailResponseModel.AccountInfo.FullName,
                Gender: AccountDriverDetailResponseModel.AccountInfo.Gender,
                Birthday: AccountDriverDetailResponseModel.AccountInfo.Birthday,
                NumberPhone: AccountDriverDetailResponseModel.AccountInfo.NumberPhone,
                Addres: AccountDriverDetailResponseModel.AccountInfo.Addres,
                Email: AccountDriverDetailResponseModel.AccountInfo.Email,
                CreateDate: AccountDriverDetailResponseModel.AccountInfo.CreateDate,
                Account_Status: AccountDriverDetailResponseModel.AccountInfo.Account_Status,
                Verify: AccountDriverDetailResponseModel.AccountInfo.Verify,
                IsChangePassword: AccountDriverDetailResponseModel.AccountInfo.IsChangePassword,
                AccountType: AccountDriverDetailResponseModel.AccountInfo.AccountType,
                UnitName: AccountDriverDetailResponseModel.AccountInfo.UnitName,
                Manager: AccountDriverDetailResponseModel.AccountInfo.Manager,
                EmailManager: AccountDriverDetailResponseModel.AccountInfo.EmailManager,
                NumberPhoneManager: AccountDriverDetailResponseModel.AccountInfo.NumberPhoneManager,
                DriverLicenseNo: AccountDriverDetailResponseModel.AccountInfo.DriverLicenseNo,
                LicenseClass: AccountDriverDetailResponseModel.AccountInfo.LicenseClass,
                LicenseExpires: AccountDriverDetailResponseModel.AccountInfo.LicenseExpires,
            }

            //Cập nhật trạng thái cho account. 
            if ($scope.AccountDriverDetail.Account_Status === "1") {
                $scope.AccountDriverDetail.Account_Status = AccountStatus[1].AccountStatusName;
            } else {
                $scope.AccountDriverDetail.Account_Status = AccountStatus[0].AccountStatusName;
            }
            //Cập nhật loại tài khoản
            if ($scope.AccountDriverDetail.AccountType  === "7") {
                $scope.AccountDriverDetail.AccountType = AccountType[0].AccountTypeName;
            } else {
                $scope.AccountDriverDetail.AccountType = AccountType[1].AccountTypeName;
            }
            //Cập nhật giới tính
            if ($scope.AccountDriverDetail.Gender  === 1) {
                $scope.AccountDriverDetail.Gender = "Nam";
            } else {
                $scope.AccountDriverDetail.Gender = "Nữ";
            }  //Cập nhật phê duyệt. 
            if ($scope.AccountDriverDetail.Verify  === true) {
                $scope.AccountDriverDetail.Verify = "Đã duyệt";
            } else {
                $scope.AccountDriverDetail.Verify = "Chưa duyệt";
            } //Cập nhật đổi mật khẩu. 
            if ($scope.AccountDriverDetail.IsChangePassword  === true) {
                $scope.AccountDriverDetail.IsChangePassword = "Đã đổi";
            } else {
                $scope.AccountDriverDetail.IsChangePassword = "Chưa đổi";
            }

            //for (var i = 0; i < RoleResponse.length; i++) {
            //    // AccountStatusName
            //    if (RoleResponse[i].RoleDetail_Status === false) {
            //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[0].RoleStatusName;
            //    } else {
            //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[1].RoleStatusName;
            //    }

            //}

        }
        $scope.Main(); 


    }]);  