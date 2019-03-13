mainmodule.controller('ManagerCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.init = function () {
            $rootScope.ListRepairCost = [];
            $rootScope.ListDetailRepairCost = [];
            $scope.tableParams = $scope.tableParams = null;

            $scope.getListRepairCost();
        }

        $scope.getListRepairCost = function () {
            $BookingCar.getListRepairCost({}, function (res) {
                var ListRepairCost = res.data.Data.ListRepairCost;
                if (res.data.ReturnCode === 1) {
                    $rootScope.ListRepairCost = ListRepairCost;
                }
                $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.ListRepairCost });
            });
        }

        $scope.init();

        $scope.popupDetailRepairCost = function (request) {
            var RepairIDRequestModel = {
                RepairID: request,
            }

            $BookingCar.getDetailRepairCost(RepairIDRequestModel, function (response) {
                switch (response.data.ReturnCode) {
                    case 1:
                        var ListDetailRepairCostResponseModel = response.data.Data.ListRepairCost;
                        var modalInstance = $modal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupDetailRepairCost.html',
                            controller: 'popupManagerCostController',
                            controllerAs: 'content',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                ListDetailRepairCost: function () {
                                    return ListDetailRepairCostResponseModel;
                                },
                            }
                        });
                        modalInstance.result.then(function () {

                        });


                        break;

                }

            });


        }
    }]);

mainmodule.controller('popupManagerCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', 'ListDetailRepairCost','$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, ListDetailRepairCost, $modalInstance) {
        $scope.init = function () {
            var ListDetailRepairCostResponseModel = ListDetailRepairCost;
            $scope.tableParams = new NgTableParams({}, { dataset: ListDetailRepairCostResponseModel });
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();
    }]);  