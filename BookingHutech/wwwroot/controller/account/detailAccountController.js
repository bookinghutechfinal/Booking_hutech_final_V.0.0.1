
mainmodule.controller('DetailAccountController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', 'AccountIDRequest', 'NgTableParams', '$account','$alert',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, AccountIDRequest, NgTableParams, $account, $alert) {

        var AccountInfo = $account.getAccountInfo();

        // AccountIDRequest: Tham số nhận dữ liệu từ màn hình quản lý lái xe.
        $scope.Titile = "Chi tiết tài khoản";
        $scope.ClosePopup = function () {
            $modalInstance.close();
            location.reload();
        }
        if (checkNull(AccountIDRequest)) {
            $modalInstance.close();
        }
        // Hàm 1 xem chi tiết account  
        $scope.ShowDetailAccount = function () {
            var Account_IDRequest = {
                Account_ID: AccountIDRequest,
            }
           
            $account.ManagerGetDetailAccountByAccountID(Account_IDRequest, function (res) {

                switch (res.data.ReturnCode) {
                    case 1:

                        var AccountInfoResponse = res.data.Data.GetAccountInfo[0];
                        var RoleResponse = res.data.Data.GetRoleCode;
                        // Hiển thị thông tin account
                        //$scope.ShowAccountInfo = {
                        //    Avatar: AccountInfoResponse.Avatar,
                        //    FullName: AccountInfoResponse.FullName,
                        //    Gender: AccountInfoResponse.Gender,
                        //    Birthday: AccountInfoResponse.Birthday,
                        //    Addres: AccountInfoResponse.Addres,
                        //    AccountType: AccountInfoResponse.AccountType,
                        //    NumberPhone: AccountInfoResponse.NumberPhone,
                        //    Email: AccountInfoResponse.Email,
                        //    UnitName: AccountInfoResponse.UnitName,
                        //} 
                        $scope.AccountDetailDetail = {
                            Avatar: AccountInfoResponse.Avatar,
                            Account_ID: AccountInfoResponse.Account_ID,
                            FullName: AccountInfoResponse.FullName,
                            Gender: AccountInfoResponse.Gender,
                            Birthday: AccountInfoResponse.Birthday,
                            NumberPhone: AccountInfoResponse.NumberPhone,
                            Addres: AccountInfoResponse.Addres,
                            Email: AccountInfoResponse.Email,
                            CreateDate: AccountInfoResponse.CreateDate,
                            Account_Status: AccountInfoResponse.Account_Status,
                            Verify: AccountInfoResponse.Verify,
                            IsChangePassword: AccountInfoResponse.IsChangePassword,
                            AccountType: AccountInfoResponse.AccountType,
                            UnitName: AccountInfoResponse.UnitName,
                            Manager: AccountInfoResponse.Manager,
                            EmailManager: AccountInfoResponse.EmailManager,
                            NumberPhoneManager: AccountInfoResponse.NumberPhoneManager,
                            DriverLicenseNo: AccountInfoResponse.DriverLicenseNo,
                            LicenseClass: AccountInfoResponse.LicenseClass,
                            LicenseExpires: AccountInfoResponse.LicenseExpires,
                        }


                        //Cập nhật loại tài khoản 
                        if ($scope.AccountDetailDetail.AccountType === "1") {
                            $scope.AccountDetailDetail.AccountType = AccountTypeRequest[0].AccountTypeName;
                        }           
                        if ($scope.AccountDetailDetail.AccountType === "2") {
                            $scope.AccountDetailDetail.AccountType = AccountTypeRequest[1].AccountTypeName;
                        }           
                        if ($scope.AccountDetailDetail.AccountType === "3") {
                            $scope.AccountDetailDetail.AccountType = AccountTypeRequest[2].AccountTypeName;
                        }           
                        if ($scope.AccountDetailDetail.AccountType === "4") {
                            $scope.AccountDetailDetail.AccountType = AccountTypeRequest[3].AccountTypeName;
                        }           
                        if ($scope.AccountDetailDetail.AccountType === "5") {
                            $scope.AccountDetailDetail.AccountType = AccountTypeRequest[4].AccountTypeName;
                        }           
                        if ($scope.AccountDetailDetail.AccountType === "7") {
                            $scope.AccountDetailDetail.AccountType = AccountTypeRequest[5].AccountTypeName;
                        }

                        //Cập nhật giới tính
                        if ($scope.AccountDetailDetail.Gender === 1) {
                            $scope.AccountDetailDetail.Gender = "Nam";
                        } else {
                            $scope.AccountDetailDetail.Gender = "Nữ";
                        }  //Cập nhật phê duyệt. 
                        //if ($scope.AccountDriverDetail.Verify === true) {
                        //    $scope.AccountDriverDetail.Verify = "Đã duyệt";
                        //} else {
                        //    $scope.AccountDriverDetail.Verify = "Chưa duyệt";
                        //} //Cập nhật đổi mật khẩu. 
                        //if ($scope.AccountDriverDetail.IsChangePassword === true) {
                        //    $scope.AccountDriverDetail.IsChangePassword = "Đã đổi";
                        //} else {
                        //    $scope.AccountDriverDetail.IsChangePassword = "Chưa đổi";
                        //}

                        $scope.tableParams1 = new NgTableParams({}, { dataset: RoleResponse });
                        $scope.GetRole();  
                        break;
                }

            });

        }// end
       
         
        // hám khởi tạo tất cả giá trị; 
        $scope.Init = function () { 
            $scope.tableParams1 = $scope.tableParams1 = null;
            $scope.tableParams2 = $scope.tableParams2 = null;
            $scope.ListRole = [];
            $scope.ShowDetailAccount();
        }
         
        $scope.Init();  

        // Hàm 2: Lấy ds quyền chưa cấp cho account
        $scope.GetRole = function () {
            var Account_IDRequest = {
                Account_ID: AccountIDRequest,
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

        // update khóa, mở duyền
        $scope.UpdateRole = function (roleRequestModel) {
            if (roleRequestModel.RoleDetail_Status == false) {
                $alert.showConfirmUpdateCarInfo($rootScope.initMessage('Bạn muốn mở quyền cho tài khoản này?'), function () {
                    let DeleteRoleRequestModel = {
                        RoleMaster_ID: roleRequestModel.RoleMaster_ID,
                        Account_ID: AccountIDRequest,
                        RoleDetail_Status: 1
                    }
                    $account.DeleteRole(DeleteRoleRequestModel, function (res) {
                        switch (res.data.Data) {
                            case 1:
                                toastr.success('Bạn đã cập nhật thành công.');
                                $scope.ShowDetailAccount();
                                break;
                            case 2:
                                toastr.error('Bạn đã cập nhật thất bại.');
                                break;
                        }
                    });
                });
            } else
                $alert.showConfirmUpdateCarInfo($rootScope.initMessage('Bạn muốn khóa quyền cho tài khoản này?'), function () {
                    let DeleteRoleRequestModel = {
                        RoleMaster_ID: roleRequestModel.RoleMaster_ID,
                        Account_ID: AccountIDRequest,
                        RoleDetail_Status: 0
                    }
                    $account.DeleteRole(DeleteRoleRequestModel, function (res) {
                        switch (res.data.Data) {
                            case 1:
                                toastr.success('Bạn đã cập nhật thành công.');
                                $scope.ShowDetailAccount();
                                break;
                            case 2:
                                toastr.error('Bạn đã cập nhật thất bại.');
                                break;
                        }
                    });
                });
        }

        // Button mở phân quyền  
        $scope.ShowLayoutDecentralization = false;
        $scope.ShowDecentralization = function () {
            if ($scope.ShowLayoutDecentralization) {
                $scope.ShowLayoutDecentralization = false;
            } else {
                $scope.ShowLayoutDecentralization = true;
                //code
                // gọi hàm lấy quyền chưa được phân cho account
                //$scope.GetRole();  
            }
        }
        //Thông tin quyền được cấp
        var RoleRequest = [];
        var CheckRole = {
            RoleMaster_ID: null,
            Account_ID: null,
            FullNameUpdate: null,
            RoleDetail_Status: null
        }

        // check all
        $scope.checkUncheckAll = function () {
            if ($scope.checkall) {
                $scope.checkall = true;
                alert("check all1");
            } else {
                $scope.checkall = false;
              //  alert("check all2");
                if (RoleRequest.length == 0) {
                    for (var i = 0; i < ListRole.length; i++) {
                        CheckRole = {
                            RoleMaster_ID: ListRole[i].RoleMaster_ID,
                        }
                        RoleRequest.push(CheckRole);
                    }

                } else {
                    var test = RoleRequest;
                    for (var i = 0; i < test.length; i++) {
                        CheckRole = {
                            RoleMaster_ID: ListRole[i].RoleMaster_ID,
                        }
                        for (var j = 0; j < ListRole.length; j++) {
                            if (test[i].RoleMaster_ID != ListRole[j].RoleMaster_ID) {
                                RoleRequest.push(CheckRole);
                            }
                        }
                    }
                }

            }

        };

        $scope.ListRoleMasterResponse = [];
        $scope.tableParams2 = $scope.tableParams2 = null;
        $scope.ManagerGetRole = function () {
            $account.ManagerGetRoleMasterByAccountID({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ListRoleMasterResponse = res.data.Data.RoleMasterByAccountID;
                        $scope.tableParams2 = new NgTableParams({}, { dataset: $scope.ListRoleMasterResponse });
                        break;
                }
            });
        } // end

        // Cập nhật chọn quyền để cấp
        $scope.updateCheck = function (RoleMasterIDRequest) {
            CheckRole = {
                RoleMaster_ID: RoleMasterIDRequest,
                Account_ID: AccountIDRequest,
                FullNameUpdate: AccountInfo.FullName,
                RoleDetail_Status: true
            }
            for (var i = 0; i < RoleRequest.length; i++) {
                if (RoleRequest[i].RoleMaster_ID == RoleMasterIDRequest) {
                    RoleRequest.splice(i, 1);
                    return;
                }
            }
            RoleRequest.push(CheckRole);
        };

        // button cấp quyền 
        $scope.Decentralization = function () {
            //*** Funciton 1: Gọi hàm logout 
            $alert.showConfirmUpdateCarInfo($rootScope.initMessage('Bạn muốn cập nhật quyền cho tài khoản này?'), function () {
                $account.UpdateRole(RoleRequest, function (res) {
                    switch (res.data.Data) {
                        case 1:
                            toastr.success('Bạn đã cập nhật thành công.');
                            $scope.ShowDetailAccount();
                            let count = RoleRequest.length;
                            for (var i = 0; i <= count; i++) {
                                RoleRequest.pop();
                            }
                            break;
                        case 2:
                            toastr.error('Bạn đã cập nhật thất bại.');
                            break;
                    }
                });
            });
        }
        // Button cập nhật account. 
        //1. Chưa duyệt
        $scope.checkupdateVerify = false; 
        $scope.buttonVerify = function (request) {  
            var VerifyAccountRequestModel = {
                Account_ID: request.Account_ID,
                Verify: 1 // duyệt
            }
            // ok gọi api update thành công sẽ cập nhật lại lưới và hiển thị lại
            $alert.showConfirmUpdateNewProfile('Duyệt tài khoản này!', function () {
                $account.ManagerUpdateAccount(VerifyAccountRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                           // $scope.AccountDriverDetail.Verify = true;
                            //$scope.checkupdateVerify = true; 
                            toastr.success("Duyệt thành công");
                            break;
                    }

                });

            }); //end

        }
        

    }]);  