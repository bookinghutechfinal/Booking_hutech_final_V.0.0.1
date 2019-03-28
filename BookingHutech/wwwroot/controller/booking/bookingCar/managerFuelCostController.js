mainmodule.controller('ManagerFuelCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.init = function () {
            var ListCost = [];
            $scope.ClearData();

            $scope.getListCost();
            $scope.getListCar();
        }

        $scope.searchModel = {}

        //Get list cost by CostsTypeID
        $scope.getListCost = function () {
            var CostsTypeIDRequestModel = {
                CostsTypeID: 1,
            }
            $scope.ClearData();
            $scope.ShowListCost = false;

            //reset
            var request = $scope.searchModel;
            angular.element('#myDate2').val("");
            angular.element('#myDate1').val("");
            request.CarID = 0;

            $BookingCar.getListCost(CostsTypeIDRequestModel, function (response) {
                var List = response.data.Data.ListRepairCost;
                if (response.data.ReturnCode === 1) {
                    ListCost = List;
                }
                $scope.tableParams = new NgTableParams({}, { dataset: ListCost });
            });
        }
        //Get list car
        $scope.getListCar = function () {
            var getListcarRequestModel = {
                CarStatus1: 1000,
                CarStatus2: 1001 //lấy tất cả xe
            }

            $BookingCar.getListCar(getListcarRequestModel, function (res) {
                var listCar = res.data.Data.ListCar;
                if (res.data.ReturnCode === 1) {
                    $rootScope.ListCarInfo = listCar;  // danh sách car hoạt động 
                }

            });
        }

        $scope.ShowListCost = false;
        $scope.ClearData = function () {
            $scope.tableParams = $scope.tableParams = null;
            $scope.tableParams1 = $scope.tableParams1 = null;
        }

        //Search cost by CostsTypeID, CarID, Date_from, Date_to
        $scope.searchCost = function (request) {
            var searchCostRequestModel = {
                CarID: request.CarID,
                CostsTypeID: 1,
                Date_to: angular.element('#myDate2').val(),
                Date_from: angular.element('#myDate1').val()
            }

            $scope.ShowListCost = true;
            $scope.ClearData();

            $BookingCar.searchCost(searchCostRequestModel, function (response) {
                switch (response.data.ReturnCode) {
                    case 1:
                        var result = response.data.Data.ListRepairCost;
                        $scope.tableParams1 = new NgTableParams({}, { dataset: result });
                        if (result.length==0)
                            toastr.error("Không có dữ liệu.");
                        break;
                    case 2:
                        toastr.error("Không có dữ liệu.");
                        break;
                }
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

mainmodule.controller('popupManagerFuelCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  