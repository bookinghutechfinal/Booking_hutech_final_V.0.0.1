mainmodule.controller('ManagerFuelCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.init = function () {
            var ListCost = [];
            $scope.tableParams = $scope.tableParams = null;
            
            $scope.getListCost();
        }

        $scope.getListCost = function () {
            var CostsTypeIDRequestModel = {
                CostsTypeID: 1,
            }

            $BookingCar.getListCost(CostsTypeIDRequestModel, function (response) {
                var List = response.data.Data.ListRepairCost;
                if (response.data.ReturnCode === 1) {
                    ListCost = List;
                }
                $scope.tableParams = new NgTableParams({}, { dataset: ListCost });
            });
        }

        $scope.init();

        $scope.addNewCost = function () {

            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewCost.html',
                controller: 'popupManagerFuelCostController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    ListDetailRepairCost: function () {
                        return null;
                    },
                }
            });
            modalInstance.result.then(function () {

            });

        }
    }]);

mainmodule.controller('popupManagerFuelCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams','$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  