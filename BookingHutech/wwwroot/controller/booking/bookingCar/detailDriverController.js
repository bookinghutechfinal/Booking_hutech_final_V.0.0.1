
mainmodule.controller('DetailDriverController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'AccountInfoDatailRequest', 'NgTableParams',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, AccountInfoDatailRequest, NgTableParams) {
        // AccountInfoDatailRequest: Tham số nhận dữ liệu từ màn hình quản lý lái xe.  
        var AccountDriverDetailResponseModel = AccountInfoDatailRequest.AccountInfo;
        var AccountRoleDriverResponseModel = AccountInfoDatailRequest.RoleInfo;
        $scope.Titile = "Chi tiết tài xế";
        $scope.ClosePopup = function () {
            $modalInstance.close();
            location.reload();
        }
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
        var RoleStatus = [
            {
                'RoleStatusName': 'Đã Khóa',
                'RoleStatusID': false
            },
            {
                'RoleStatusName': 'Hoạt động',
                'RoleStatusID': true
            },
        ];
        $scope.Main = function () {
            $scope.tableParams1 = $scope.tableParams1 = null;


            $scope.AccountDriverDetail = {
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

            //Cập nhật trạng thái cho account. 
            //if ($scope.AccountDriverDetail.Account_Status === "1") {
            //    $scope.AccountDriverDetail.Account_Status = AccountStatus[1].AccountStatusName;
            //} else {
            //    $scope.AccountDriverDetail.Account_Status = AccountStatus[0].AccountStatusName;
            //}
            //Cập nhật loại tài khoản
            if ($scope.AccountDriverDetail.AccountType === "7") {
                $scope.AccountDriverDetail.AccountType = AccountType[0].AccountTypeName;
            } else {
                $scope.AccountDriverDetail.AccountType = AccountType[1].AccountTypeName;
            }
            //Cập nhật giới tính
            if ($scope.AccountDriverDetail.Gender === 1) {
                $scope.AccountDriverDetail.Gender = "Nam";
            } else {
                $scope.AccountDriverDetail.Gender = "Nữ";
            }  //Cập nhật phê duyệt. 
            if ($scope.AccountDriverDetail.Verify === true) {
                $scope.AccountDriverDetail.Verify = "Đã duyệt";
            } else {
                $scope.AccountDriverDetail.Verify = "Chưa duyệt";
            } //Cập nhật đổi mật khẩu. 
            if ($scope.AccountDriverDetail.IsChangePassword === true) {
                $scope.AccountDriverDetail.IsChangePassword = "Đã đổi";
            } else {
                $scope.AccountDriverDetail.IsChangePassword = "Chưa đổi";
            }
            //Cập nhật trạng thái cho quyền. 
            //for (var i = 0; i < AccountRoleDriverResponseModel.length; i++) {
            //    // AccountStatusName
            //    if (AccountRoleDriverResponseModel[i].RoleDetail_Status === false) {
            //        AccountRoleDriverResponseModel[i].RoleDetail_Status = RoleStatus[0].RoleStatusName;
            //    } else {
            //        AccountRoleDriverResponseModel[i].RoleDetail_Status = RoleStatus[1].RoleStatusName;
            //    }

            //}
            $scope.tableParams1 = new NgTableParams({}, { dataset: AccountRoleDriverResponseModel });
        }
        $scope.Main();

        var dataChart = [{
            "label": "Venezuela",
            "value": "290"
        }, {
            "label": "Saudi",
            "value": "260"
        }, {
            "label": "Canada",
            "value": "180"
        }, {
            "label": "Iran",
            "value": "140"
        }, {
            "label": "Russia",
            "value": "115"
        }, {
            "label": "UAE",
            "value": "100"
        }
        ];
        // datasource
        $scope.myDataSource = {
            "chart": {
                "caption": "Countries With Most Oil Reserves [2017-18]",
                "subCaption": "In MMbbl = One Million barrels",
                "xAxisName": "Country",
                "yAxisName": "Reserves (MMbbl)",
                "numberSuffix": "K",
                "theme": "fusion",
            },
            "data": dataChart
        };



        $scope.UpdateRole = function (roleRequestModel) {
            if (roleRequestModel.RoleDetail_Status === RoleStatus[0].RoleStatusID) {
                alert("Mở quyền " + roleRequestModel.RoleName);
                $scope.checkedRule = true;
            } else
                alert("Khóa quyền " + roleRequestModel.RoleName);
            $scope.checkedRule = false;

        }


    }]);  