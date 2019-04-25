mainmodule.controller('popupAddNewCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance','$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance, $account) {
        try {
        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.costInfo = {
                RepairID: null,
                CostsTypeID: null,
                Car_ID: null,
                CreateDate: null,
                Note: null,
                RepairAddres: null,
                AccountCreate: null,
                FullNameUpdate: null,
                Content: null,
                Quantity: null,
                TotalMoney: null,
                Done: false,
                RepairStatus: null,
                ImageBill: null,
                AddType: null
            }
            $scope.getListCar();
        }

        //Lấy danh sách xe
        $scope.getListCar = function () {
            var getListcarRequestModel = {
                CarStatus1: 1000,
                CarStatus2: 1000 //không có điều kiện
            }

            $BookingCar.getListCar(getListcarRequestModel, function (res) {
                var listCar = res.data.Data.ListCar;
                if (res.data.ReturnCode === 1) {
                    $scope.ListCarInfo = listCar;  // danh sách car hoạt động 
                }

            });
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

        $scope.btndisabled = true;
        $scope.TestInputChange = function (Request) {
            if (checkNull(Request.CostsTypeID)) { 
                $scope.btndisabled = true;
                return;
            } else
            if (checkNull(Request.Car_ID)) {
                $scope.btndisabled = true;
                return;
            } else
            if (angular.element('#myDate').val() == 'Invalid date') {
                $scope.btndisabled = true;
                return;
            } else
            if (checkNull(Request.RepairAddres)) {
                $scope.btndisabled = true;
                return;
            } else
            if ($scope.costInfo.Done) {
                if (checkNull(Request.Content)) {
                    $scope.btndisabled = true;
                    return;
                } else
                if (checkNull(Request.Quantity)) {
                    $scope.btndisabled = true;
                    return;
                } else
                if (checkNull(Request.TotalMoney)) {
                    $scope.btndisabled = true;
                    return;
                }
            }
            $scope.btndisabled = false;
        } 

        $scope.addNewCost = function (request) {
            $scope.costInfo.AccountCreate = AccountInfo.ObjAccountInfo.Account_ID;
            if ($scope.costInfo.Done) {
                $scope.costInfo.RepairStatus = 2;
            }
            else {
                $scope.costInfo.RepairStatus = 0;
            }
            $scope.costInfo.FullNameUpdate = AccountInfo.ObjAccountInfo.FullName;
            if (checkNull($scope.costInfo.Quantity))
                $scope.costInfo.Quantity = 0;
            if (checkNull($scope.costInfo.TotalMoney))
                $scope.costInfo.TotalMoney = 0;
            $scope.costInfo.CreateDate = FormatDateTimeToDBRequest(angular.element('#myDate').val());
            $scope.costInfo.AddType = 1;
            $BookingCar.addNewCost($scope.costInfo, function (res) {
                switch (res.data.Data) {
                    case 1:
                        toastr.success('Thêm mới thành công.');
                        $modalInstance.close();
                        break;
                    case 2:
                        toastr.error('Thêm mới thất bại.');
                        $modalInstance.close();
                        break;
                }
            });
            }
        } catch (e) {
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
            $state.go("login");
        }
    }]);  