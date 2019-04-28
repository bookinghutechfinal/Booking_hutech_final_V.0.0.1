mainmodule.controller('popupAddNewDetailCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance', '$account', 'DetailCost',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance, $account, DetailCost) {
        if ($rootScope.CheckCookies()) {
            var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 
        }
        var repairID = DetailCost.RepairID;

        $scope.init = function () {
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
                    TotalMoney: request.TotalMoney,
                    RepairID: repairID

                });
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
            }
        }
        $scope.init();

        $scope.SaveNewDetail = function (request) {
            if ($rootScope.CheckCookies()) {
                $BookingCar.addNewDetailCost(request, function (res) {
                    switch (res.data.Data) {
                        case 1:
                            toastr.success('Thêm mới thành công.');
                            break;
                        case 2:
                            toastr.error('Thêm mới thất bại.');
                            break;
                    }
                });
                $modalInstance.close();
            }
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

    }]);  