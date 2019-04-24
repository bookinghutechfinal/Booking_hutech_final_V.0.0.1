mainmodule.controller('ManagerOtherCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$alert', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $alert, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.ClearData();

            $scope.getListCost();
            $scope.getListCar();
        }

        $scope.searchModel = {}
        var today = new Date();
        var dayRequestFrom = new Date();
        var dayRequestTo = new Date();
        dayRequestFrom.setDate(today.getDate() - 90);
        dayRequestTo.setDate(today.getDate() + 2);

        //Get list cost by CostsTypeID
        $scope.getListCost = function () {
            $scope.ErrorDay = false;
            var RequestModel = {
                CostsTypeID: 3,
                DateFrom: dayRequestFrom,
                DateTo: dayRequestTo,
                CarID: 0,
                RepairStatus: 3,
                RepairStatus1: 4,
                RepairStatus2: 3,
                RepairStatus3: 4,
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
            var limit = 0;

            if (date_from == "Invalid date" && date_to == "Invalid date") {
                date_from = dayRequestFrom;
                date_to = dayRequestTo;
                limit = 100;
            }
            else
                if (date_from == "Invalid date" || date_to == "Invalid date") {
                    $scope.ErrorDay = true;
                    return;
                }

            if (So_Sanh_DateInput2(date_to, date_from)) {
                var searchCostRequestModel = {
                    CostsTypeID: 3,
                    DateFrom: date_from,
                    DateTo: date_to,
                    CarID: request.CarID,
                    RepairStatus: 0,
                    RepairStatus1: 1,
                    RepairStatus2: 2,
                    RepairStatus3: 4,
                    Limit: limit
                }
                if (limit == 100)
                    $scope.nonMess = false;
                else
                    $scope.nonMess = true;
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
                $scope.getListCost();
            });

        }

        $scope.comfirm = function (request, repairStatus) {
            if (repairStatus == '')
                return;
            if (repairStatus == 2) {
                var modalInstance1 = $modal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddDetailRepairCost.html',
                    controller: 'popupAddNewDetailCostController',
                    controllerAs: 'content',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        DetailCost: function () {
                            return request;
                        },
                    }
                });
                modalInstance1.result.then(function () {
                    $scope.getListCost();
                });
            } else {
                $alert.showUpdateDistance($rootScope.initMessage('Bạn muốn cập nhật đơn này? Vui lòng để lại ghi chú.'), function () {
                    let updateRepairStatusRequestModel = {
                        RepairID: request.RepairID,
                        RepairStatus: repairStatus,
                        FullNameUpdate: AccountInfo.ObjAccountInfo.FullName,
                        Note: $rootScope.alertValue
                    }
                    $BookingCar.updateRepairStatus(updateRepairStatusRequestModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                toastr.success('Bạn đã cập nhật thành công.');
                                $scope.getListCost();
                                break;
                            case 2:
                                toastr.success('Bạn đã cập nhật thất bại');
                                break;
                        }
                    });
                });

                $scope.getListCost();
            }
        }
    }]);

mainmodule.controller('popupManagerOtherCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams','$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  