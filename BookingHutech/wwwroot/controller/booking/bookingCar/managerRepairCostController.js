mainmodule.controller('ManagerRepairCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.init = function () {
            var ListRepairCost = [];
            $scope.tableParams = $scope.tableParams = null;

            $scope.getListRepairCost();
        }

        $scope.getListRepairCost = function () {
            $BookingCar.getListRepairCost({}, function (res) {
                var List = res.data.Data.ListRepairCost;
                if (res.data.ReturnCode === 1) {
                    ListRepairCost = List;
                }
                $scope.tableParams = new NgTableParams({}, { dataset: ListRepairCost });
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
                            controller: 'popupManagerRepairCostController',
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

        $scope.addNewCost = function () {

            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewCost.html',
                controller: 'popupManagerRepairCostController',
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

mainmodule.controller('popupManagerRepairCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', 'ListDetailRepairCost','$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, ListDetailRepairCost, $modalInstance) {

        $scope.init = function () {
            var ListDetailRepairCostResponseModel = ListDetailRepairCost;
            $scope.tableParams2 = new NgTableParams({}, { dataset: ListDetailRepairCostResponseModel });
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  