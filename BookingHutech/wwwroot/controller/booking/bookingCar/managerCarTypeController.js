// Thêm mới tài khoản 
mainmodule.controller('ManagerCarTypeController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal', '$modalInstance', '$alert', '$BookingCar',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $modal, $modalInstance, $alert, $BookingCar) {

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
        $scope.ManagerGetListCarType = function () {
            if ($rootScope.CheckCookies()) {
                $BookingCar.getListCarType({}, function (res) {

                    switch (res.data.ReturnCode) {
                        case 1:
                            $scope.ManagerGetListCarTypeResponse = res.data.Data;
                            $scope.tableParams = new NgTableParams({}, { dataset: $scope.ManagerGetListCarTypeResponse });
                            break;
                    }

                });
            }
        }
        $scope.main = function () {
            // model
            $scope.CreateNewCarTypeModel = {
                CarTypeName: null,
                FullNameUpdate: null,
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
            $scope.ManagerGetListCarTypeResponse = [];
            $scope.ManagerGetListCarType();
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


      
        //  thêm mới đơn vị
        $scope.btnCreateNewCarType = function (request) {
            if ($rootScope.CheckCookies()) {
                $scope.CreateNewCarTypeRequest = {
                    CarTypeName: request,
                    FullNameUpdate: AccountInfo.FullName,
                }
                if (checkNull($scope.CreateNewCarTypeRequest.CarTypeName)) {
                    toastr.error("Vui lòng nhập tên loại xe");
                    return;
                }
                $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn thêm mới loại xe này'), function () {
                    $BookingCar.CreateNewCarType($scope.CreateNewCarTypeRequest, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                toastr.success("Đã thêm thành công");
                                $scope.ManagerGetListCarType();
                                $scope.ClearAddNewUnit();
                                // $scope.CancelAddNewUnit(); 
                                break;
                        }
                    });
                });
            } else {
                $modalInstance.close();
            }

        }
        // xóa dl liệu nhanh
        $scope.ClearAddNewUnit = function () {
            $scope.CreateNewCarTypeModel = {
                CarTypeName: null,
                FullNameUpdate: null,
            };
        }
        // hủy thao tác thêm mới
        $scope.CancelAddNewUnit = function () {
            $scope.isShowAddNewUnit = false;
            $scope.btnAcction = false;
        }
        // hủy thao tác chỉnh sửa
        $scope.CancelEditUnit = function () {
            $scope.isShowEditUnit = false;
            $scope.CreateNewCarTypeModel = {
                CarTypeName: null,
                FullNameUpdate: null,
            };
        }
        // show add new
        $scope.btnAcction = false;  // button edit, delete
        $scope.isShowAddNewUnit = false;
        $scope.ShowAddNewUnit = function () {
            $scope.isShowAddNewUnit = true;
            $scope.btnAcction = true;
        }
        $scope.CancelNewUnit = function () {
            $scope.btndisabled = false;
            $scope.isShowAddNewUnit = false;
            $scope.btnAcction = false;
            $scope.CreateNewCarTypeModel = {
                CarTypeName: null,
                FullNameUpdate: null,
            };

        }

        // Chình sửa 
        $scope.isShowEditUnit = false;

        $scope.btnEdit = function (request) {
            $scope.isShowRegisterSuccess = false; 
            $scope.isShowEditUnit = true;
            $scope.CreateNewUnitModel.UnitName = request.UnitName;
            $scope.CreateNewUnitModel.UnitManager = request.UnitManager;
            $scope.CreateNewUnitModel.EmailManage = request.EmailManage;
            $scope.CreateNewUnitModel.NumberPhoneManager = parseInt(request.NumberPhoneManager);
            $scope.CreateNewUnitModel.Unit_ID = request.Unit_ID;

        }
        // button lưu chỉnh sửa/ 
        //$scope.btnEditUnit = function () {
        //    try {
        //        var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
        //        var testCookies = AccountInfo.ObjAccountInfo.Account_ID;
        //        $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn chỉnh sửa đơn vị này'), function () {
        //            $account.EditUnit($scope.CreateNewUnitModel, function (res) {
        //                switch (res.data.ReturnCode) {
        //                    case 1:
        //                        $scope.isShowUpdateSuccess = true;
        //                        toastr.success("Chỉnh sửa thành công");
        //                        $scope.tableParams = $scope.tableParams = null; 
        //                        for (var i = 0; i < $scope.ManagerGetListUnitResponse.length; i++) {
        //                            if ($scope.ManagerGetListUnitResponse[i].Unit_ID == $scope.CreateNewUnitModel.Unit_ID) {
        //                                $scope.ManagerGetListUnitResponse[i].UnitName = $scope.CreateNewUnitModel.UnitName; 
        //                                $scope.ManagerGetListUnitResponse[i].UnitManager = $scope.CreateNewUnitModel.UnitManager; 
        //                                $scope.ManagerGetListUnitResponse[i].EmailManage = $scope.CreateNewUnitModel.EmailManage; 
        //                                $scope.ManagerGetListUnitResponse[i].NumberPhoneManager = $scope.CreateNewUnitModel.NumberPhoneManager; 
        //                            }
        //                        } 
        //                        $scope.tableParams = new NgTableParams({}, { dataset: $scope.ManagerGetListUnitResponse });
        //                        break;
        //                }
        //            });
        //        });
        //    } catch (e) {
        //        $scope.ClosePopup();
        //        $cookies.remove('AccountInfo');
        //        $cookies.remove("AccountInfoCheckPermissions");
        //        $cookies.remove("myReload");
        //        toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
        //        $state.go("login");
        //    } 
        //}

        // new 
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

        // Button hủy thao tác đổi tên   quyền. 
        $scope.disableEditorRole = function (index) {
            $alert.showConfirmAddNew('Hủy thao tác đổi tên!', function () {
                $scope.editorEnabledRole[index] = false;
                $scope.showmessRole[index] = false;
                $scope.ManagerGetRole();  // cập nhật lại giá trị cho table, đề phòng trường hợp người dùng chỉnh sửa rồi hủy. 

            });

        };

        //Button lưu thay đổi tên  quyền. 
        $scope.SaveCarType = function (CarTypeRequest, index) {
            if ($rootScope.CheckCookies()) {
                $scope.UpdateCarTypeResquestModel = {
                    CarTypeID: CarTypeRequest.CarTypeID,
                    CarTypeName: CarTypeRequest.CarTypeName, 
                    FullNameUpdate: AccountInfo.FullName,
                }
                // kiểm tra trước khi update 
                if (checkNull($scope.UpdateCarTypeResquestModel.CarTypeName)) {
                    toastr.error("Không được để trống!. Vui lòng nhập");
                    $scope.showmessRole[index] = true;
                    return;
                }
                // ok gọi api update thành công sẽ cập nhật lại lưới và hiển thị lại
                $alert.showConfirmUpdateNewProfile('Cập nhật tên loại xe!', function () {
                    $BookingCar.UpdateCarType($scope.UpdateCarTypeResquestModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                $scope.editorEnabledRole[index] = false;
                                $scope.showmessRole[index] = false;
                                toastr.success("Cập nhật thành công");
                                $scope.ManagerGetListCarType();
                                break;
                        }

                    });
                }); //end
            } else {
                $modalInstance.close();
            }
        }

    }]);

