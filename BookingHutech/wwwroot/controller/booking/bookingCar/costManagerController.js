mainmodule.controller('CostManagerController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar) {

        $scope.init = function () {
            $rootScope.ListRepairCost = []; // Danh sách xe. 

            $scope.getListRepairCost();
        }

        $scope.getListRepairCost = function () {
            $BookingCar.getListRepairCost({}, function (res) {
                var ListRepairCost = res.data.Data.ListRepairCost;
                if (res.data.ReturnCode === 1) {
                    $rootScope.ListRepairCost = ListRepairCost;
                }
            });
        }

        $scope.init();

}]);  