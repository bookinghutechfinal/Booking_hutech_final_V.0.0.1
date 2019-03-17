
mainmodule.controller('ManagerAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams','$alert',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $alert) {

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
            FullName: null,
            Gender: null,
            BirthDay: null,
            Addres: null,
            AccountType: null
        }
        $scope.RoleStatus = [
            {
                'RoleStatusName': 'Đã Khóa',
                'RoleStatusID': 0
            },
            {
                'RoleStatusName': 'Hoạt động',
                'RoleStatusID': 1
            },
        ];




        // Lấy chi tiết tài khoản của admin và chi tiết quyền. 
        $scope.GetDetailAccountInfoAndRole = function () {
            $scope.RequestAccountID = {
                Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
            }
            $scope.tableParams1 = $scope.tableParams1 = null;
            $account.ManagerGetDetailAccountByAccountID($scope.RequestAccountID, function (res) {
                debugger
                switch (res.data.ReturnCode) {
                    case 1:
                        var AccountInfoResponse = res.data.Data.GetAccountInfo[0];
                        var RoleResponse = res.data.Data.GetRoleCode;
                        // Hiển thị thông tin account
                        $scope.ShowAccountInfo = {
                            FullName: AccountInfoResponse.FullName,
                            Gender: AccountInfoResponse.Gender,
                            Birthday: AccountInfoResponse.Birthday,
                            Addres: AccountInfoResponse.Addres,
                            AccountType: AccountInfoResponse.AccountType,
                            NumberPhone: AccountInfoResponse.NumberPhone,
                            Email: AccountInfoResponse.Email,
                            UnitName: AccountInfoResponse.UnitName,
                        }
                        //Cập nhật trạng thái cho quyền. 
                        for (var i = 0; i < RoleResponse.length; i++) {
                            // AccountStatusName
                            if (RoleResponse[i].RoleDetail_Status === false) {
                                RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[0].RoleStatusName;
                            } else {
                                RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[1].RoleStatusName;
                            }

                        }
                        // Hiển thị thông tin quyền 
                        $scope.tableParams1 = new NgTableParams({}, { dataset: RoleResponse });
                        break;
                }

            });
        }

        // Lấy danh sách nhóm quyền. 
        $scope.GroupRoleResponse = []; 
        $scope.GetGroupRole = function () {  
            $account.ManagerGetListGroupRole({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.GroupRoleResponse = res.data.Data.ListGroupRole; 
                        break;
                }

            }); 

        }

        $scope.main = function () { 
            $scope.GetDetailAccountInfoAndRole();
            $scope.GetGroupRole();
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

        // Chỉnh sửa nhóm quyền. 
        $scope.editorEnabled = [];  // ẩn hiện các button
        $scope.showmess = [];       // ẩn hiện các thông báo
        
        $scope.enableEditor = function (index) {
            $scope.editorEnabled[index] = true;
        }
        $scope.disableEditor = function (index) {
            $alert.showConfirmAddNew('Hủy thao tác đổi tên!', function () {
                $scope.editorEnabled[index] = false;
                $scope.showmess[index] = false;
                $scope.GetGroupRole();  // cập nhật lại giá trị cho table, đề phòng trường hợp người dùng chỉnh sửa rồi hủy. 
                
            }); //end 
             
        };

        $scope.Save = function (RoleRequestModel, index) {
            //alert("ID" + RoleRequestModel.GroupRoleID + "\n Tên:" + RoleRequestModel.GroupRoleName);
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
                            $scope.GetGroupRole();
                            toastr.success("Cập nhật thành công");
                            break;
                    }

                }); 

            }); //end
           
        }
    }]);  