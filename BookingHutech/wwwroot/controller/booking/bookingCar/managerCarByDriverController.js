mainmodule.controller('ManagerCarByDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$stateParams', '$alert', '$rootScope', 'NgTableParams','$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $stateParams, $alert, $rootScope, NgTableParams, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.ClearData();
            $scope.getCarInfo();
            $scope.getListCost();
            $scope.ErrorDay = false;
        }

        // Hàm Lấy danh sách xe
        $scope.getCarInfo = function () {
            var getCarInfoRequestModel = {
                Account_ID: AccountInfo.ObjAccountInfo.Account_ID
            }
            $BookingCar.getCarInfoByAccountID(getCarInfoRequestModel, function (res) {

                if (res.data.Data.length != 0) {
                    var carInfo = res.data.Data[0];
                    $scope.CarInfo = carInfo;  // chi tiết xe
                } else {
                    toastr.error("Xin lỗi. Bạn chưa được phân công xe!");
                    $state.go("main.bookingcar");
                }

            });
        }

        $scope.searchModel = {}

        $scope.getListCost = function () {
            //reset
            var request = $scope.searchModel;
            angular.element('#myDate2').val("");
            angular.element('#myDate1').val("");
            request.RepairStatus = "";

            $scope.ErrorDay = false;
            $scope.ClearData();
            $scope.ShowListCost = false;

            var getListCostRequestModel = {
                AccountCreate: AccountInfo.ObjAccountInfo.Account_ID,
                RepairStatus1: 1,
                RepairStatus2: 1,
                DateFrom: '1-1-1900',
                DateTo: new Date()
            }

            $BookingCar.getListCostByAccountCreate(getListCostRequestModel, function (res) {
                var result = res.data.Data.ListRepairCost;
                if (res.data.ReturnCode === 1) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].RepairStatus === 0)
                            result[i].RepairStatus = RepairStatus[0].RepairStatusName;
                        if (result[i].RepairStatus === 1)
                            result[i].RepairStatus = RepairStatus[1].RepairStatusName;
                        if (result[i].RepairStatus === 2)
                            result[i].RepairStatus = RepairStatus[2].RepairStatusName;
                    }
                    $scope.tableParams = new NgTableParams({}, {dataset : result});
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
            var repairStatus1 = 1111;
            var repairStatus2 = 1111;
            if (request.RepairStatus == 0) {
                repairStatus1 = 1;
                repairStatus2 = 2;
            }
            if (request.RepairStatus == 1) {
                repairStatus1 = 0;
                repairStatus2 = 2;
            }
            if (request.RepairStatus == 2) {
                repairStatus1 = 1;
                repairStatus2 = 0;
            }
            if (request.RepairStatus == "") {
                var repairStatus1 = 1111;
                var repairStatus2 = 1111;
            }

            var date_from = FormatDateTimeToDBRequest(angular.element('#myDate1').val());
            var date_to = FormatDateTimeToDBRequest(angular.element('#myDate2').val());

            if (So_Sanh_DateInput2(date_to, date_from) && date_from != "Invalid date" && date_to != "Invalid date") {

                var searchCostRequestModel = {
                    AccountCreate: AccountInfo.ObjAccountInfo.Account_ID,
                    RepairStatus1: repairStatus1,
                    RepairStatus2: repairStatus2,
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
            }
            else {
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

mainmodule.controller('popupManagerCarByDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  