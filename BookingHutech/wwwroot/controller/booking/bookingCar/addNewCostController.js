mainmodule.controller('popupAddNewCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance, $account) {
        if ($rootScope.CheckCookies()) {
            var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 
        }

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
                RepairStatus: null,
                ImageBill: null
            }
            $scope.getListCar();
            $scope.DetailCost = [];
            $scope.ErrorInput = false;
        }

        $scope.AddMore = function (request) {
            if ($rootScope.CheckCookies()) {
                if (checkNull(request.Content) || checkNull(request.Quantity) || checkNull(request.TotalMoney)) {
                    $scope.ErrorInput = true;
                    return;
                }

                $scope.DetailCost.push({
                    Content: request.Content,
                    Quantity: request.Quantity,
                    TotalMoney: request.TotalMoney
                });
                if (checkNull($scope.costInfo.CostsTypeID) || checkNull($scope.costInfo.Car_ID) || checkNull($scope.costInfo.RepairAddres)) {
                    $scope.btndisabled = true;
                }
                else {
                    $scope.btndisabled = false;
                }
            }
        }

        $scope.Delete = function (index) {
            if ($rootScope.CheckCookies()) {
                if (index == $scope.DetailCost.length) {
                    $scope.DetailCost.pop();
                }
                else {
                    for (var i = index; i < $scope.DetailCost.length - 1; i++) {
                        $scope.DetailCost[i] = $scope.DetailCost[i + 1];
                    }
                    $scope.DetailCost.pop();
                }
                if ($scope.DetailCost.length == 0) {
                    $scope.btndisabled = true;
                    return;
                }
            }
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
                        }
            if ($scope.DetailCost.length == 0) {
                $scope.btndisabled = true;
                return;
            }
            $scope.btndisabled = false;
        }

        $scope.addNewCost = function (request) {
            if ($rootScope.CheckCookies()) {
                $scope.costInfo.AccountCreate = AccountInfo.Account_ID;
                $scope.costInfo.FullNameUpdate = AccountInfo.FullName;
                $scope.costInfo.RepairStatus = 2;
                $scope.costInfo.CreateDate = FormatDateTimeToDBRequest(angular.element('#myDate').val());
                let AddNewCostRequestModel = {
                    newCost: $scope.costInfo,
                    newDetailCost: $scope.DetailCost
                }
                $BookingCar.addNewCosts(AddNewCostRequestModel, function (res) {
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
        }
    }]);  