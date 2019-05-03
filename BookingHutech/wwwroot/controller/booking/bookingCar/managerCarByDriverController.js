mainmodule.controller('ManagerCarByDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$stateParams', '$alert', '$rootScope', 'NgTableParams', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $stateParams, $alert, $rootScope, NgTableParams, $account) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.ClearData();
            $scope.getListCost();
            $scope.ErrorDay = false;
        }


        var today = new Date();
        var dayRequestFrom = new Date();
        var dayRequestTo = new Date();
        dayRequestFrom.setDate(today.getDate() - 90);
        dayRequestTo.setDate(today.getDate() + 2);
        $scope.searchModel = {}

        $scope.getListCost = function () {
            if ($rootScope.CheckCookies()) {
                let AccountInfo = $account.getAccountInfo();
                var request = $scope.searchModel;
                angular.element('#myDate2').val("");
                angular.element('#myDate1').val("");
                request.RepairStatus = "";

                $scope.ErrorDay = false;
                $scope.ClearData();
                $scope.ShowListCost = false;

                var getListCostRequestModel = {
                    AccountCreate: AccountInfo.Account_ID,
                    RepairStatus: 3,
                    RepairStatus1: 4,
                    RepairStatus2: 3,
                    RepairStatus3: 4,
                    DateFrom: dayRequestFrom,
                    DateTo: dayRequestTo
                }

                $BookingCar.getListCostByAccountCreate(getListCostRequestModel, function (res) {
                    var result = res.data.Data.ListRepairCost;
                    if (res.data.ReturnCode === 1) {
                        $scope.tableParams = new NgTableParams({}, { dataset: result });
                    }
                });
            }
        }

        $scope.ShowListCost = false;
        $scope.ClearData = function () {
            $scope.tableParams = $scope.tableParams = null;
            $scope.tableParams1 = $scope.tableParams1 = null;
        }

        //Search cost by CostsTypeID, CarID, Date_from, Date_to
        $scope.searchCost = function (request) {
            if ($rootScope.CheckCookies()) {
                let AccountInfo = $account.getAccountInfo();
                var repairStatus = 1111;
                var repairStatus1 = 1111;
                var repairStatus2 = 1111;
                var repairStatus3 = 1111;
                if (request.RepairStatus == 0) {
                    repairStatus = 1;
                    repairStatus1 = 2;
                    repairStatus2 = 3;
                    repairStatus3 = 4;
                }
                if (request.RepairStatus == 1) {
                    repairStatus = 0;
                    repairStatus1 = 2;
                    repairStatus2 = 3;
                    repairStatus3 = 4;
                }
                if (request.RepairStatus == 2) {
                    repairStatus = 0;
                    repairStatus1 = 1;
                    repairStatus2 = 3;
                    repairStatus3 = 4;
                }
                if (request.RepairStatus == 3) {
                    repairStatus = 0;
                    repairStatus1 = 1;
                    repairStatus2 = 2;
                    repairStatus3 = 4;
                }
                if (request.RepairStatus == 4) {
                    repairStatus = 0;
                    repairStatus1 = 1;
                    repairStatus2 = 2;
                    repairStatus3 = 3;
                }
                if (request.RepairStatus == "") {
                    var repairStatus = 1111;
                    var repairStatus1 = 1111;
                    var repairStatus2 = 1111;
                    var repairStatus3 = 1111;
                }

                var date_from = FormatDateTimeToDBRequest(angular.element('#myDate1').val());
                var date_to = FormatDateTimeToDBRequest(angular.element('#myDate2').val());
                $scope.nonMess = true;
                if (date_from == "Invalid date" && date_to == "Invalid date") {
                    date_from = dayRequestFrom;
                    date_to = dayRequestTo;
                    $scope.nonMess = false;
                }
                else
                    if (date_from == "Invalid date" || date_to == "Invalid date") {
                        $scope.ErrorDay = true;
                        return;
                    }

                if (So_Sanh_DateInput2(date_to, date_from)) {

                    var searchCostRequestModel = {
                        AccountCreate: AccountInfo.Account_ID,
                        RepairStatus: repairStatus,
                        RepairStatus1: repairStatus1,
                        RepairStatus2: repairStatus2,
                        RepairStatus3: repairStatus3,
                        DateTo: date_to,
                        DateFrom: date_from
                    }

                    $scope.ErrorDay = false;
                    $scope.ShowListCost = true;
                    $scope.ClearData();

                    $BookingCar.getListCostByAccountCreate(searchCostRequestModel, function (res) {
                        var result = res.data.Data.ListRepairCost;
                        switch (res.data.ReturnCode) {
                            case 1:
                                if (result.length == 0) {
                                    toastr.error("Không có dữ liệu.");
                                }
                                $scope.datefrom = date_from;
                                $scope.dateto = date_to;
                                $scope.tableParams1 = new NgTableParams({}, { dataset: result });
                                break;
                            case 2:
                                toastr.error("Không có dữ liệu.");
                                break;
                        }
                    });
                }
                else {
                    $scope.ErrorDay = true;
                }
            }
        }
        if ($rootScope.CheckCookies()) {
            $scope.init();
        }

        $scope.addNewCost = function () {
            if ($rootScope.CheckCookies()) {
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
        }

        $scope.comfirm = function (request) {
            if ($rootScope.CheckCookies()) {
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

                $scope.getListCost();
            }
        }
    }]);

mainmodule.controller('popupManagerCarByDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  