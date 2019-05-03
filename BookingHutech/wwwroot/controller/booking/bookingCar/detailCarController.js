mainmodule.controller('DetailCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$stateParams', '$alert', '$rootScope', 'NgTableParams', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $stateParams, $alert, $rootScope, NgTableParams, $account) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.ActiviteMonth = [];
            var ListCost = [];
            $scope.CarInfo = {
                CarImage: null,
                CarName: null,
                CarNo: null,
                CarTypeName: null,
                CarTypeID: null,
                Expires: null,
                InsuranceExpires: null,
                CarName: null,
                CarID: null,
                CarStatus: null,
                LastModifiedDate: null
            };
            if ($rootScope.CheckCookies()) {
                $scope.getCarInfo();
                $scope.getRegistrationCarByCarID();
                $scope.getListCostByCarID();
                $scope.getDriverManageCar();
            } 

        }

        // Hàm Lấy danh sách xe
        $scope.getCarInfo = function () {
            var getCarInfoRequestModel = {
                CarID: $stateParams.CarID
            }
            $BookingCar.getCarInfo(getCarInfoRequestModel, function (res) {

                if (res.data.Data.length != 0) {
                    var carInforesponse = res.data.Data[0];
                    // $scope.CarInfo = carInfo;  // chi tiết xe
                    $scope.CarInfo = {
                        CarImage: carInforesponse.CarImage,
                        CarName: carInforesponse.CarName,
                        CarNo: carInforesponse.CarNo,
                        CarTypeName: carInforesponse.CarTypeName,
                        CarTypeID: carInforesponse.CarTypeID,
                        Expires: carInforesponse.Expires,
                        InsuranceExpires: carInforesponse.InsuranceExpires,
                        CarName: carInforesponse.CarName,
                        CarID: carInforesponse.CarID,
                        CarStatus: carInforesponse.CarStatus,
                        LastModifiedDate: carInforesponse.LastModifiedDate,
                    };
                } else {
                    toastr.error("Xin lỗi. Không tìm thấy xe này trong hệ thống!");
                    $state.go("main.bookingcar");
                }

            });
        }

        //Lấy thông tin tài xế quản lý xe
        $scope.getDriverManageCar = function () {
            var getDriverManageCarRequestModel = {
                CarID: $stateParams.CarID
            }
            $BookingCar.GetDriverManageCar(getDriverManageCarRequestModel, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.DriverInfo = res.data.Data;
                        break;
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
                        "label": FormatDateTimeByDBResponse1(listData[i].DateTimeFrom),
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
        if ($rootScope.CheckCookies()) {
            $scope.init();
        }

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

        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();

        //Biểu đồ thống kê hoạt động theo tháng của xe
        $scope.myDataSource = {
            "chart": {
                "caption": "Thống kê các chuyến đi trong tháng",
                "subCaption": `Thang ${month}/${year}`,
                "xAxisName": "Ngày",
                "yAxisName": "Số KM",
                "numberSuffix": " KM",
                "theme": "fusion",
            },
            "data": $scope.ActiviteMonth
        };
        //popup chỉnh sửa thông tin xe
        $scope.updateCar = function () {
            if ($rootScope.CheckCookies()) {
                var CarInfoResponeModel = $scope.CarInfo;
                var modalInstance = $modal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupUpdateCar.html',
                    controller: 'popupDetailCarController',
                    controllerAs: 'content',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        CarInfoRequest: function () {
                            return CarInfoResponeModel;
                        },
                    }
                });
                modalInstance.result.then(function (result) {
                    $scope.getCarInfo();
                });
            } 
                
        }
    }]);

