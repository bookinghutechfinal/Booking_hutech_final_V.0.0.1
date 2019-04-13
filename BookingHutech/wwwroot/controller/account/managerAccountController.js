
mainmodule.controller('ManagerAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$alert', '$modal',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $alert, $modal) {

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

        $scope.ShowAccountInfo = {
            Avatar: null,
            FullName: null,
            Gender: null,
            BirthDay: null,
            Addres: null,
            AccountType: null
        } 
        $scope.searchText = ""; 
        // Hàm Lấy chi tiết tài khoản của admin và chi tiết quyền. 
        $scope.GetDetailAccountInfoAndRole = function () {
            $scope.RequestAccountID = {
                Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            }
            $scope.tableParams1 = $scope.tableParams1 = null;
            $account.ManagerGetDetailAccountByAccountID($scope.RequestAccountID, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        var AccountInfoResponse = res.data.Data.GetAccountInfo[0];
                        var RoleResponse = res.data.Data.GetRoleCode;
                        // Hiển thị thông tin account
                        $scope.ShowAccountInfo = {
                            Avatar: AccountInfoResponse.Avatar,
                            FullName: AccountInfoResponse.FullName,
                            Gender: AccountInfoResponse.Gender,
                            Birthday: AccountInfoResponse.Birthday,
                            Addres: AccountInfoResponse.Addres,
                            AccountType: ConvertAccountTypeIDToName(AccountInfoResponse.AccountType),
                            NumberPhone: AccountInfoResponse.NumberPhone,
                            Email: AccountInfoResponse.Email,
                            UnitName: AccountInfoResponse.UnitName,
                        }
                        //Cập nhật trạng thái cho quyền. 
                        for (var i = 0; i < RoleResponse.length; i++) {
                            // AccountStatusName
                            if (RoleResponse[i].RoleDetail_Status === false) {
                                RoleResponse[i].RoleDetail_Status = RoleStatus[0].RoleStatusName;
                            } else {
                                RoleResponse[i].RoleDetail_Status = RoleStatus[1].RoleStatusName;
                            } 
                        }
                        // Hiển thị thông tin quyền 
                        $scope.tableParams1 = new NgTableParams({}, { dataset: RoleResponse }); 
                        // Mặc định lấy danh sách tài khoản  người dùng theo loại tài khoản và trạng thái account.  
                        $scope.ManagerGetListAccountRequestModel = {
                            AccountType: 7, // Lái xe
                            Account_Status: 1 // 1. hoạt động, 0: khóa
                        }
                        $scope.ManagerGetListAccount($scope.ManagerGetListAccountRequestModel);
                        break;
                }

            });
        }
        $scope.ManagerGetListAccountResponse = []; // danh sách tài khoản trả về
        $scope.ManagerGetListAccount = function (request) {
            $account.ManagerGetAccountByAccountStatusAccountType(request, function (res) {
                debugger
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ManagerGetListAccountResponse = res.data.Data.GetAccountByAccountStatus;
                        $scope.numPag = 6; // số lượng item trên 1 trang 
                        //Cập nhật trạng thái cho quyền. 
                        for (var i = 0; i < $scope.ManagerGetListAccountResponse.length; i++) {
                            $scope.ManagerGetListAccountResponse[i].AccountType = ConvertAccountTypeIDToName($scope.ManagerGetListAccountResponse[i].AccountType); 
                            //if ($scope.ManagerGetListAccountResponse[i].AccountType === "1") {
                            //    $scope.ManagerGetListAccountResponse[i].AccountType = AccountTypeRequest[0].AccountTypeName;
                            //}
                            //if ($scope.ManagerGetListAccountResponse[i].AccountType === "2") {
                            //    $scope.ManagerGetListAccountResponse[i].AccountType = AccountTypeRequest[1].AccountTypeName;
                            //}
                            //if ($scope.ManagerGetListAccountResponse[i].AccountType === "3") {
                            //    $scope.ManagerGetListAccountResponse[i].AccountType = AccountTypeRequest[2].AccountTypeName;
                            //}
                            //if ($scope.ManagerGetListAccountResponse[i].AccountType === "4") {
                            //    $scope.ManagerGetListAccountResponse[i].AccountType = AccountTypeRequest[3].AccountTypeName;
                            //}
                            //if ($scope.ManagerGetListAccountResponse[i].AccountType === "5") {
                            //    $scope.ManagerGetListAccountResponse[i].AccountType = AccountTypeRequest[4].AccountTypeName;
                            //}
                            //if ($scope.ManagerGetListAccountResponse[i].AccountType === "7") {
                            //    $scope.ManagerGetListAccountResponse[i].AccountType = AccountTypeRequest[5].AccountTypeName;
                            //}

                        }
                        if ($scope.ManagerGetListAccountResponse.length === 0) {
                            toastr.success("Xin lỗi! Không có kết quả.");
                        }
                        break;
                }

            });
        }


        $scope.ListRoleMasterResponse = [];
        $scope.tableParams2 = $scope.tableParams2 = null;
        $scope.ManagerGetRole = function () {
            $account.ManagerGetRoleMaster({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ListRoleMasterResponse = res.data.Data.RoleMasterByAccountID;
                        $scope.tableParams2 = new NgTableParams({}, { dataset: $scope.ListRoleMasterResponse });
                        break;
                }
            });
        } // end

        // Hàm Lấy danh sách nhóm quyền. 
        $scope.GroupRoleResponse = [];
        $scope.GetGroupRole = function () {
            $account.ManagerGetListGroupRole({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.GroupRoleResponse = res.data.Data.ListGroupRole;
                        $scope.ManagerGetRole();  // Hàm lấy danh sách quyền. 
                        break;
                }

            });

        } 

        $scope.main = function () {
            $scope.GetDetailAccountInfoAndRole(); // Lấy chi tiết account.   
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

        //1. Lọc quyền theo nhóm quyền 
        $scope.filterRole = function (reqRroupRoleID) {
            $scope.filterRoleResponseModel = [];
            if (reqRroupRoleID !== "" && reqRroupRoleID !== undefined) {
                for (var i = 0; i < $scope.ListRoleMasterResponse.length; i++) {
                    var filterRoleRequest = {
                        GroupRoleID: null,
                        GroupRoleName: null,
                        RoleMaster_ID: null,
                        RoleName: null,
                    }
                    if ($scope.ListRoleMasterResponse[i].GroupRoleID == parseInt(reqRroupRoleID)) {
                        filterRoleRequest = {
                            GroupRoleID: $scope.ListRoleMasterResponse[i].GroupRoleID,
                            GroupRoleName: $scope.ListRoleMasterResponse[i].GroupRoleName,
                            RoleMaster_ID: $scope.ListRoleMasterResponse[i].RoleMaster_ID,
                            RoleName: $scope.ListRoleMasterResponse[i].RoleName,
                        }
                        $scope.filterRoleResponseModel.push(filterRoleRequest);
                    }
                }
                $scope.tableParams2 = $scope.tableParams2 = null;
                $scope.tableParams2 = new NgTableParams({}, { dataset: $scope.filterRoleResponseModel });
            } else {

                $scope.tableParams2 = $scope.tableParams2 = null;
                $scope.tableParams2 = new NgTableParams({}, { dataset: $scope.ListRoleMasterResponse });

            }

        } 

        //2. Quản lý nhóm quyền. 
        // Hiển thị nhóm quyền. 
        $scope.isShowGroupRole = false;
        $scope.ShowGroupRole = function () {
            if (!$scope.isShowGroupRole) {
                $scope.isShowGroupRole = true;
                $scope.isShowRole = false; // đóng quyền lại
                $scope.GetGroupRole();
            } else {
                $scope.isShowGroupRole = false;
            }
        }
        // Chỉnh sửa nhóm quyền. 
        $scope.editorEnabled = [];  // ẩn hiện các button
        $scope.showmess = [];       // ẩn hiện các thông báo 
        $scope.enableEditor = function (index) {
            $scope.editorEnabled[index] = true;
        }
        // Button hủy thao tác đổi tên nhóm quyền. 
        $scope.disableEditor = function (index) {
            $alert.showConfirmAddNew('Hủy thao tác đổi tên!', function () {
                $scope.editorEnabled[index] = false;
                $scope.showmess[index] = false;
                $scope.GetGroupRole();  // cập nhật lại giá trị cho table, đề phòng trường hợp người dùng chỉnh sửa rồi hủy. 

            });

        };

        //Button lưu thay đổi tên nhóm quyền. 
        $scope.Save = function (RoleRequestModel, index) {
            $scope.UpdateGropRoleResquestModel = {
                GroupRoleID: RoleRequestModel.GroupRoleID,
                GroupRoleName: RoleRequestModel.GroupRoleName
            }
            // kiểm tra trước khi update 
            if (checkNull($scope.UpdateGropRoleResquestModel.GroupRoleName)) {
                toastr.error("Không được để trống!. Vui lòng nhập");
                $scope.showmess[index] = true;
                return;
            }
            // ok gọi api update thành công sẽ cập nhật lại lưới và hiển thị lại
            $alert.showConfirmUpdateNewProfile('Đổi tên nhóm quyền!', function () {
                $account.ManagerUpdateGroupRole($scope.UpdateGropRoleResquestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            $scope.editorEnabled[index] = false;
                            $scope.showmess[index] = false;
                            toastr.success("Cập nhật thành công");
                            break;
                    }

                });

            }); //end

        }

        // 3. Quản lý danh sách quyền
        $scope.isShowRole = false;
        $scope.ShowRole = function () {
            if (!$scope.isShowRole) {
                $scope.isShowRole = true;
                $scope.isShowGroupRole = false; // đóng nhóm quyền lại
                $scope.GetGroupRole();

            } else {
                $scope.isShowRole = false;
            }
        }
        // Chỉnh sửa   quyền. 
        $scope.editorEnabledRole = [];  // ẩn hiện các button
        $scope.showmessRole = [];       // ẩn hiện các thông báo 
        $scope.enableEditorRole = function (index) {
            $scope.editorEnabledRole[index] = true;
        }
        // Button hủy thao tác đổi tên   quyền. 
        $scope.disableEditorRole = function (index) {
            $alert.showConfirmAddNew('Hủy thao tác đổi tên!', function () {
                $scope.editorEnabledRole[index] = false;
                $scope.showmessRole[index] = false;
                $scope.ManagerGetRole();  // cập nhật lại giá trị cho table, đề phòng trường hợp người dùng chỉnh sửa rồi hủy. 

            });

        };

        //Button lưu thay đổi tên  quyền. 
        $scope.SaveRole = function (RoleRequestModel, index) {
            $scope.UpdateRoleResquestModel = {
                RoleMaster_ID: RoleRequestModel.RoleMaster_ID,
                RoleName: RoleRequestModel.RoleName,
                UserNameUpdate: AccountInfo.ObjAccountInfo.FullName,
            }
            // kiểm tra trước khi update 
            if (checkNull($scope.UpdateRoleResquestModel.RoleName)) {
                toastr.error("Không được để trống!. Vui lòng nhập");
                $scope.showmessRole[index] = true;
                return;
            }
            // ok gọi api update thành công sẽ cập nhật lại lưới và hiển thị lại
            $alert.showConfirmUpdateNewProfile('Cập nhật tên quyền!', function () {
                $account.ManagerUpdateRoleMaster($scope.UpdateRoleResquestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            $scope.editorEnabledRole[index] = false;
                            $scope.showmessRole[index] = false;
                            toastr.success("Cập nhật thành công");
                            break;
                    }

                });
            }); //end

        }

        //4.  Button  Mở popup thêm mới tài khoản người dùng và lái xe . 
        $scope.ManagerOpenpopupAddNewDriver = function () {
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/popupCreateNewAccount.html',
                controller: 'ManagerCreateNewAccountController',
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

        //5. Xem chi tiết account. 
        // Lấy thông tin chi tiết lái xe. 
        $scope.ShowDetailAccount = function (Request) {
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
                            Avatar: AccountInfoResponse.Avatar,
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
                        $scope.OpenPopupDetailAccount($scope.AccountInfoDatail);
                        break;
                }

            });

        }

        //// Mỡ popup xem chi tiết account 
        $scope.OpenPopupDetailAccount = function (AccountInfoDatailRequest) {
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/popupDetailAccount.html',
                controller: 'DetailAccountController',
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

        // 6. Button tìm kiếm account. 
        $scope.isCheckAccounttype = false;
        $scope.isCheckAccountstatus = false;
        $scope.btndisabledSearch = false;
        $scope.messdisabled = false;
        $scope.SearchAccountReqModel = {
            AccountType: null,
            Account_Status: null
        }
        $scope.ChangeDataSearchAccount = function () {
            if (checkNull($scope.SearchAccountReqModel.AccountType)) {
                $scope.btndisabledSearch = false;
                $scope.messdisabled = true;
                return;
            }
            if (checkNull($scope.SearchAccountReqModel.Account_Status)) {
                $scope.btndisabledSearch = false;
                $scope.messdisabled = true;
                return;
            }
            if ($scope.SearchAccountReqModel.Account_Status != '' && !checkNull($scope.SearchAccountReqModel.AccountType)) {
                $scope.btndisabledSearch = true;
                $scope.messdisabled = false;

            }

        }
        // Button Tìm kiếm account
        $scope.SearchAccount = function () {
            $scope.ManagerGetListAccount($scope.SearchAccountReqModel);
        }
         

    }]);  