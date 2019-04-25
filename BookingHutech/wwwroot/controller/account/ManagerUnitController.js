// Thêm mới tài khoản 
mainmodule.controller('ManagerUnitController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal', '$modalInstance', '$alert',
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
                        $scope.tableParams = new NgTableParams({}, { dataset: $scope.ManagerGetListUnitResponse });
                        break;
                }

            });
        } 
        $scope.main = function () { 
            // model
            $scope.CreateNewUnitModel = {
                "UnitName": null,
                "UnitManager": null,
                "EmailManage": null,
                "NumberPhoneManager": null,
                "Unit_ID": null,
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
            $scope.tableParams = $scope.tableParams = null; 
            $scope.ManagerGetListUnitResponse = [];
            $scope.ManagerGetListUnit();
        }

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
                $scope.ClosePopup();
                $scope.goToLogin();
                break;

        }
        
        $scope.btndisabled = false;
        $scope.isCheckEmail = false;
        $scope.isShowRegisterSuccess = false;
        $scope.TestInputChange = function (Request) {  
            $scope.isShowRegisterSuccess = false;
            // check data
            if (checkNull(Request.UnitName)) {
                $scope.btndisabled = true;
                return;
            } else if (checkNull(Request.UnitManager)) {
                $scope.btndisabled = true;
                return;
            } else if (checkNull(Request.NumberPhoneManager)) {
                $scope.btndisabled = true;
                return;
            } else if (!checkEmailInput(Request.EmailManage)) {
                $scope.btndisabled = true;
                $scope.isCheckEmail = true;
                return;
            } else if ($scope.isCheckEmail){
                $scope.btndisabled = true;
                $scope.isCheckEmail = false;
            }  
            else {
                $scope.btndisabled = false;
            } 
        } 
        // Lấy thông tin chi tiết lái xe. 
        $scope.CeateNewUnit = function () { 
            try {
                var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
                var testCookies = AccountInfo.ObjAccountInfo.Account_ID;
                $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn thêm mới đơn vị này'), function () {
                    $account.CreateNewUnit($scope.CreateNewUnitModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1: 
                                $scope.isShowRegisterSuccess = true;
                                toastr.success("Đã thêm thành công"); 
                                $scope.ManagerGetListUnit();
                                $scope.CancelAddNewUnit(); 
                                break;
                        }
                    });
                });
            } catch (e) {
                $scope.ClosePopup();
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
                $state.go("login");
            } 
        } 
        // xóa dl liệu nhanh
        $scope.ClearAddNewUnit = function () {
            $scope.CreateNewUnitModel = {
                "UnitName": null,
                "UnitManager": null,
                "EmailManage": null,
                "NumberPhoneManager": null,
                "Unit_ID": null,
            }; 
        }
        // hủy thao tác thêm mới
        $scope.CancelAddNewUnit = function () {
            $scope.btndisabled = false;
            $scope.isShowAddNewUnit = false; 
            $scope.btnAcction = false; 
        }
        // hủy thao tác chỉnh sửa
        $scope.CancelEditUnit = function () { 
            $scope.isShowEditUnit = false; 
            $scope.CreateNewUnitModel = {
                "UnitName": null,
                "UnitManager": null,
                "EmailManage": null,
                "NumberPhoneManager": null,
                "Unit_ID": null,
            }; 
        }
        // show add new
        $scope.btnAcction = false;  // button edit, delete
        $scope.isShowAddNewUnit = false; 
        $scope.ShowAddNewUnit = function () {
            $scope.isShowAddNewUnit = true; 
            $scope.btnAcction = true;
            $scope.TestInputChange($scope.CreateNewUnitModel)
        }
        $scope.CancelNewUnit = function () {
            $scope.btndisabled = false;
            $scope.isShowAddNewUnit = false;  
            $scope.btnAcction = false;
            $scope.CreateNewUnitModel = {
                "UnitName": null,
                "UnitManager": null,
                "EmailManage": null,
                "NumberPhoneManager": null,
                "Unit_ID": null,
            }; 

        }

        // Chình sửa 
        $scope.isShowEditUnit = false;  
     
        $scope.btnEdit = function (request) {
            $scope.isShowEditUnit = true;
            $scope.CreateNewUnitModel.UnitName = request.UnitName;
            $scope.CreateNewUnitModel.UnitManager = request.UnitManager;
            $scope.CreateNewUnitModel.EmailManage = request.EmailManage;
            $scope.CreateNewUnitModel.NumberPhoneManager = parseInt(request.NumberPhoneManager);
            $scope.CreateNewUnitModel.Unit_ID = request.Unit_ID;
             
        }
        // button lưu chỉnh sửa/ 
        $scope.btnEditUnit = function () {
            try {
                var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
                var testCookies = AccountInfo.ObjAccountInfo.Account_ID;
                $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn chỉnh sửa đơn vị này'), function () {
                    $account.EditUnit($scope.CreateNewUnitModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                $scope.isShowRegisterSuccess = true;
                                toastr.success("Chỉnh sửa thành công");
                                $scope.tableParams = $scope.tableParams = null; 
                                for (var i = 0; i < $scope.ManagerGetListUnitResponse.length; i++) {
                                    if ($scope.ManagerGetListUnitResponse[i].Unit_ID == $scope.CreateNewUnitModel.Unit_ID) {
                                        $scope.ManagerGetListUnitResponse[i].UnitName = $scope.CreateNewUnitModel.UnitName; 
                                        $scope.ManagerGetListUnitResponse[i].UnitManager = $scope.CreateNewUnitModel.UnitManager; 
                                        $scope.ManagerGetListUnitResponse[i].EmailManage = $scope.CreateNewUnitModel.EmailManage; 
                                        $scope.ManagerGetListUnitResponse[i].NumberPhoneManager = $scope.CreateNewUnitModel.NumberPhoneManager; 
                                    }
                                } 
                                $scope.tableParams = new NgTableParams({}, { dataset: $scope.ManagerGetListUnitResponse });
                                break;
                        }
                    });
                });
            } catch (e) {
                $scope.ClosePopup();
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
                $state.go("login");
            } 
        }
    }]);
 
