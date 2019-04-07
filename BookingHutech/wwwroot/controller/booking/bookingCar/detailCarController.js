mainmodule.controller('DetailCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$stateParams', '$alert', '$rootScope','NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $stateParams, $alert, $rootScope, NgTableParams) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.ActiviteMonth = [];
            var ListCost = [];
            $scope.CarInfo = [];
            $scope.getCarInfo();
            $scope.getRegistrationCarByCarID();
            $scope.getListCostByCarID();
        }

        // Hàm Lấy danh sách xe
        $scope.getCarInfo = function () {
            var getCarInfoRequestModel = {
                CarID: $stateParams.CarID
            }
            $BookingCar.getCarInfo(getCarInfoRequestModel, function (res) {
                
                if (res.data.Data.length != 0) {
                    var carInfo = res.data.Data[0];
                    $scope.CarInfo = carInfo;  // chi tiết xe
                } else {
                    toastr.error("Xin lỗi. Không tìm thấy xe này trong hệ thống!");
                    $state.go("main.bookingcar");
                } 

            });
        }
        //lấy thông tin các đơn đặt xe đã hoàn thành theo CarID
        $scope.getRegistrationCarByCarID = function () {
            var RegistrationCarRequestModel = {
                CarID: $stateParams.CarID
            }
            $BookingCar.getRegistrationCarByCarID(RegistrationCarRequestModel, function (response) {
                var listData = response.data.Data.GetRegistrationCarByCarID;
                if (response.data.ReturnCode === 1) {
                    $rootScope.activitiveCar = listData;
                }
                for (var i = 0; i < listData.length; i++) {// lấy dữ liệu vẽ biểu đồ
                    var obj = {
                        "label": null,
                        "value": null
                    };
                    obj = {
                        "label": FormatDateTimeByDBResponse(listData[i].DateTimeFrom),
                        "value": listData[i].DistanceTotal
                    }
                    $scope.ActiviteMonth.push(obj);
                }
            });
        }

        //Get list cost by CarID
        $scope.getListCostByCarID = function () {
            var CarIDRequestModel = {
                CarID: $stateParams.CarID,
            }

            $BookingCar.getListCostByCarID(CarIDRequestModel, function (response) {
                var List = response.data.Data.ListRepairCost;
                if (response.data.ReturnCode === 1) {
                    ListCost = List;
                }
                $scope.tableParams = new NgTableParams({}, { dataset: ListCost });
            });
        }

        $scope.init();
        
        $scope.isShowActivitive = false;
        $scope.ShowActivitive = function () {//mở/đóng hoạt động gần đây
            if (!$scope.isShowActivitive) {
                $scope.isShowActivitive = true;
                $scope.isShowCost = false;
            } else {
                $scope.isShowActivitive = false;
            }
        }
        $scope.isShowCost = false;
        $scope.ShowCost = function () {//mở/đóng chi phí gần đây
            if (!$scope.isShowCost) {
                $scope.isShowCost = true;
                $scope.isShowActivitive = false;
            } else {
                $scope.isShowCost = false;
            }
        }
        //Hàm đổi trạng thái xe
        $scope.updateCarStatus = function (request) {
            var updateCarStatusRequestModel = {
                CarID: $stateParams.CarID,
                CarStatus: request
            }
            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn đổi tình trạng xe này?'), function () {
                $BookingCar.updateCarStatus(updateCarStatusRequestModel, function (response) {
                    if (response.data.ReturnCode === 1) {
                       // $scope.getCarInfo();
                        toastr.success("Bạn đã đổi thành công.");
                        $scope.CarInfo.CarStatus = updateCarStatusRequestModel.CarStatus;

                    }
                });
            }); 
            
        }
        //Biểu đồ thống kê hoạt động theo tháng của xe
        $scope.myDataSource = {
            "chart": {
                "caption": "Thống kê các chuyến đi trong tháng",
                "subCaption": "Tháng 3/2019",
                "xAxisName": "Ngày",
                "yAxisName": "Số KM",
                "numberSuffix": " KM",
                "theme": "fusion",
            },
            "data": $scope.ActiviteMonth
        };
        //popup chỉnh sửa thông tin xe
        $scope.updateCar = function () {
            var CarInfoResponeModel = $scope.CarInfo;
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupUpdateCar.html',
                controller: 'popupDetailCarController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'md',
                resolve: {
                    CarInfoRequest: function () {
                        return CarInfoResponeModel;
                    },
                }
            });
            modalInstance.result.then(function () {

            });

        }
    }]);  

mainmodule.controller('popupDetailCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance','CarInfo',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance, CarInfoRequest) {

        $scope.init = function () {
            $scope.CarInfo = CarInfoRequest;
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  