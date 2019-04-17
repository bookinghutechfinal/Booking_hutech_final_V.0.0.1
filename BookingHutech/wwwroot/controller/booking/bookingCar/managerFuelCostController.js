mainmodule.controller('ManagerFuelCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$alert','$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $alert, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.ClearData();

            $scope.getListCost();
            $scope.getListCar();
        }

        $scope.searchModel = {}

        //Get list cost by CostsTypeID
        $scope.getListCost = function () {
            $scope.ErrorDay = false;
            var RequestModel = {
                CostsTypeID: 1,
                DateFrom: '1-1-1900',
                DateTo: new Date(),
                CarID: 0,
                RepairStatus: 1,
                RepairStatus1: 2,
                Limit: 0
            }
            $scope.ClearData();
            $scope.ShowListCost = false;

            //reset
            var request = $scope.searchModel;

            angular.element('#myDate2').val("");
            angular.element('#myDate1').val("");
            request.CarID = 0;

            $BookingCar.getListCost(RequestModel, function (response) {
                var result = response.data.Data.ListRepairCost;
                switch (response.data.ReturnCode) {
                    case 1:
                        if (result.length == 0) {
                            toastr.error("Không có dữ liệu.");
                        }
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].RepairStatus === 0)
                                result[i].RepairStatus = RepairStatus[0].RepairStatusName;
                            if (result[i].RepairStatus === 1)
                                result[i].RepairStatus = RepairStatus[1].RepairStatusName;
                            if (result[i].RepairStatus === 2)
                                result[i].RepairStatus = RepairStatus[2].RepairStatusName;
                        }
                        $scope.tableParams = new NgTableParams({}, { dataset: result });
                        break;
                    case 2:
                        toastr.error("Không có dữ liệu.");
                        break;
                }
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
            var date_from = FormatDateTimeToDBRequest(angular.element('#myDate1').val());
            var date_to = FormatDateTimeToDBRequest(angular.element('#myDate2').val());

            if (So_Sanh_DateInput2(date_to, date_from) && date_from != "Invalid date" && date_to != "Invalid date") {
                var searchCostRequestModel = {
                    CostsTypeID: 1,
                    DateFrom: date_from,
                    DateTo: date_to,
                    CarID: request.CarID,
                    RepairStatus: 0,
                    RepairStatus1: 2,
                    Limit: 0
                }
                $scope.ErrorDay = false;
                $scope.ShowListCost = true;
                $scope.ClearData();

                $BookingCar.getListCost(searchCostRequestModel, function (response) {
                    switch (response.data.ReturnCode) {
                        case 1:
                            var result = response.data.Data.ListRepairCost;
                            if (result.length == 0)
                                toastr.error("Không có dữ liệu.");
                            $scope.datefrom = date_from;
                            $scope.dateto = date_to;
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].RepairStatus === 0)
                                    result[i].RepairStatus = RepairStatus[0].RepairStatusName;
                                if (result[i].RepairStatus === 1)
                                    result[i].RepairStatus = RepairStatus[1].RepairStatusName;
                                if (result[i].RepairStatus === 2)
                                    result[i].RepairStatus = RepairStatus[2].RepairStatusName;
                            }
                            $scope.tableParams1 = new NgTableParams({}, { dataset: result });
                            break;
                        case 2:
                            toastr.error("Không có dữ liệu.");
                            break;
                    }
                });
            } else {
                $scope.ErrorDay = true;
            }
        }
        
        $scope.init();

        $scope.addNewCost = function () {

            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewCost.html',
                controller: 'popupAddNewCostController',
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

        $scope.comfirm = function (request) {
            var updateRepairStatusRequestModel = {
                RepairID: request.RepairID,
                RepairStatus: 1,
                FullNameUpdate: AccountInfo.ObjAccountInfo.FullName
            }
            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn duyệt đơn chi phí này?'), function () {
                $BookingCar.updateRepairStatus(updateRepairStatusRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success('Bạn đã duyệt đơn thành công.');
                            $scope.getListCost();
                            break;
                        case 2:
                            toastr.success('Bạn đã duyệt đơn thất bại');
                            break;
                    }
                });
            });
        }

        $scope.cancel = function (request) {
            var updateRepairStatusRequestModel = {
                RepairID: request.RepairID,
                RepairStatus: 2,
                FullNameUpdate: AccountInfo.ObjAccountInfo.FullName
            }
            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn hủy đơn chi phí này?'), function () {
                $BookingCar.updateRepairStatus(updateRepairStatusRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success('Bạn đã hủy đơn thành công.');
                            $scope.getListCost();
                            break;
                        case 2:
                            toastr.success('Bạn đã hủy đơn thất bại');
                            break;
                    }
                });
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