mainmodule.controller('ManagerCarByDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$stateParams', '$alert', '$rootScope', 'NgTableParams','$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $stateParams, $alert, $rootScope, NgTableParams, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.ClearData();
            $scope.getCarInfo();
            $scope.getListCost();
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

            $scope.ClearData();
            $scope.ShowListCost = false;

            var getListCostRequestModel = {
                AccountCreate: AccountInfo.ObjAccountInfo.Account_ID,
                RepairStatus1: 1,
                RepairStatus2: 1,
                DateFrom: '1900-1-1',
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

            var searchCostRequestModel = {
                AccountCreate: AccountInfo.ObjAccountInfo.Account_ID,
                RepairStatus1: repairStatus1,
                RepairStatus2: repairStatus2,
                DateTo: angular.element('#myDate2').val(),
                DateFrom: angular.element('#myDate1').val()
            }

            $scope.ShowListCost = true;
            $scope.ClearData();

            $BookingCar.getListCostByAccountCreate(searchCostRequestModel, function (res) {
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
                    $scope.tableParams1 = new NgTableParams({}, { dataset: result });
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

mainmodule.controller('popupManagerCarByDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  