
mainmodule.controller('DetailDriverController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'AccountInfoDatailRequest', 'NgTableParams','$account',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, AccountInfoDatailRequest, NgTableParams, $account) {
        // AccountInfoDatailRequest: Tham số nhận dữ liệu từ màn hình quản lý lái xe.   
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
        // hám khởi tạo tất cả giá trị; 
        $scopeInit = function () {
            var AccountDriverDetailResponseModel = null;
            var AccountRoleDriverResponseModel = null;
            $scope.tableParams1 = $scope.tableParams1 = null;
            $scope.ListRole = [];
        }
        $scope.Main = function () {

            $scopeInit();

            var AccountDriverDetailResponseModel = AccountInfoDatailRequest.AccountInfo;
            var AccountRoleDriverResponseModel = AccountInfoDatailRequest.RoleInfo;

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

        //var dataChart = [{
        //    "label": "Venezuela",
        //    "value": "290"
        //}, {
        //    "label": "Saudi",
        //    "value": "260"
        //}, {
        //    "label": "Canada",
        //    "value": "180"
        //}, {
        //    "label": "Iran",
        //    "value": "140"
        //}, {
        //    "label": "Russia",
        //    "value": "115"
        //}, {
        //    "label": "UAE",
        //    "value": "100"
        //}
        //];
        //// datasource
        //$scope.myDataSource = {
        //    "chart": {
        //        "caption": "Countries With Most Oil Reserves [2017-18]",
        //        "subCaption": "In MMbbl = One Million barrels",
        //        "xAxisName": "Country",
        //        "yAxisName": "Reserves (MMbbl)",
        //        "numberSuffix": "K",
        //        "theme": "fusion",
        //    },
        //    "data": dataChart
        //};



        $scope.UpdateRole = function (roleRequestModel) {
            if (roleRequestModel.RoleDetail_Status === RoleStatus[0].RoleStatusID) {
                alert("Mở quyền " + roleRequestModel.RoleName);
                $scope.checkedRule = true;
            } else
                alert("Khóa quyền " + roleRequestModel.RoleName);
            $scope.checkedRule = false;

        }

        // Button mở phân quyền  
        $scope.ShowLayoutDecentralization = false;
        $scope.ShowDecentralization = function () {
            if ($scope.ShowLayoutDecentralization) {
                $scope.ShowLayoutDecentralization = false;
            } else {
                $scope.ShowLayoutDecentralization = true;
                //code
                // gọi hàm lấy quyền lên 
                $scope.ListRole = [
                    { "GroupRoleID": 8, "GroupRoleName": "Quản lý lái xe", "RoleMaster_ID": 3, "RoleName": "Xem thông tin lái xe " },
                    { "GroupRoleID": 8, "GroupRoleName": "Quản lý lái xe", "RoleMaster_ID": 4, "RoleName": "Xem lịch công tác" },
                    { "GroupRoleID": 8, "GroupRoleName": "Quản lý lái xe", "RoleMaster_ID": 5, "RoleName": "Phân công lái xe" },
                    { "GroupRoleID": 8, "GroupRoleName": "Quản lý lái xe", "RoleMaster_ID": 6, "RoleName": "Quản lý lái xe" },
                    { "GroupRoleID": 2, "GroupRoleName": "Quản lý phong nghỉ chuyên gia", "RoleMaster_ID": 7, "RoleName": "Thêm mới phòng nghỉ" },

                ]
                //code
            }
        }
        //Thông tin quyền được cấp
        var RoleRequest = [];
        var CheckRole = {
            RoleMaster_ID: null,
        }
         
        // check all
        //$scope.checkUncheckAll = function () {
        //    if ($scope.checkall) {
        //        $scope.checkall = true;
        //        alert("check all1");
        //    } else {
        //        $scope.checkall = false;
        //      //  alert("check all2");
        //        //if (RoleRequest.length == 0) {
        //        //    for (var i = 0; i < ListRole.length; i++) {
        //        //        CheckRole = {
        //        //            RoleMaster_ID: ListRole[i].RoleMaster_ID,
        //        //        }
        //        //        RoleRequest.push(CheckRole);
        //        //    }

        //        //} else {
        //            //var test = RoleRequest;
        //            //for (var i = 0; i < test.length; i++) {
        //            //    CheckRole = {
        //            //        RoleMaster_ID: ListRole[i].RoleMaster_ID,
        //            //    }
        //            //    for (var j = 0; j < ListRole.length; j++) {
        //            //        if (test[i].RoleMaster_ID != ListRole[j].RoleMaster_ID) {
        //            //            RoleRequest.push(CheckRole);
        //            //        }
        //            //    }
        //            //}
        //        //}

        //    }

        //};

        // Cập nhật chọn quyền để cấp
        $scope.updateCheck = function (RoleMasterIDRequest) {
            CheckRole = {
                RoleMaster_ID: RoleMasterIDRequest,
            }
            for (var i = 0; i < RoleRequest.length; i++) {
                if (RoleRequest[i].RoleMaster_ID == RoleMasterIDRequest) {
                    RoleRequest.splice(i, 1);
                    return;
                }
            }
            RoleRequest.push(CheckRole);
        };

        // Request 
        var AccountInfoRequest = {
            AccountID: "BK0001",
            FullNameUpdate: 'Anh.Trần'
        }
         
        // button cấp quyền 
        $scope.Decentralization = function () {
            $scope.RoleResquestModel = {
                AccountInfoRequest: AccountInfoRequest,
                RoleRequest: RoleRequest
            }
            //*** Funciton 1: Gọi hàm logout 
            $account.ManagerDecentralization($scope.RoleResquestModel, function (res) {

                switch (res.data.ReturnCode) { 
                    case 1:
                         
                        break;
                }

            });
        }





    }]);  