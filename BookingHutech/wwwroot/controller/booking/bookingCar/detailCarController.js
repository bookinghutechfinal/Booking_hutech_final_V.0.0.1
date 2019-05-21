mainmodule.controller('DetailCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$stateParams', '$alert', '$rootScope', 'NgTableParams', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $stateParams, $alert, $rootScope, NgTableParams, $account) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            //$scope.ActiviteMonth = [];
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
            $scope.MonthSelected = new Date().getMonth()+1;
            $scope.YearSelected = new Date().getFullYear();
            if ($rootScope.CheckCookies()) {
                $scope.getCarDetail();
            } 

        }
        
        let year = new Date().getFullYear();
        $scope.YearData = YearData(year);

        $scope.getCarDetail = function () {
            var getCarDetailRequestModel = {
                CarID: $stateParams.CarID,
                Month: $scope.MonthSelected,
                Year: $scope.YearSelected,
            }
            $BookingCar.getCarDetail(getCarDetailRequestModel, function (res) {
                if (res.data.Data.ListCarInfo.length != 0) {
                    var carInforesponse = res.data.Data.ListCarInfo[0];
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
                    $scope.DriverInfo = res.data.Data.ListAssignDriverInfo;
                    $scope.activitiveCar = res.data.Data.ListRegistrationCarByCarID;
                    $scope.ReportKM = res.data.Data.ListReportDetailCarResponseModel;
                    $scope.tableParams = new NgTableParams({}, { dataset: res.data.Data.ListRepairCostByCarID });
                //    let listData = res.data.Data.ListRegistrationCarByCarID;

                //    for (var i = 0; i < listData.length; i++) {// lấy dữ liệu vẽ biểu đồ
                //    var obj = {
                //        "label": null,
                //        "value": null
                //    };
                //    obj = {
                //        "label": FormatDateTimeByDBResponse1(listData[i].DateTimeTo),
                //        "value": listData[i].DistanceTotal
                //    }
                //    $scope.ActiviteMonth.push(obj);
                //}
                } else {
                    toastr.error("Xin lỗi. Không tìm thấy xe này trong hệ thống!");
                    $state.go("main.bookingcar");
                }
            });
        }
        
        if ($rootScope.CheckCookies()) {
            $scope.init();
        }

        ////Biểu đồ thống kê hoạt động theo tháng của xe
        //$scope.myDataSource = {
        //    "chart": {
        //        "caption": "Thống kê các chuyến đi trong tháng",
        //        "subCaption": `Thang ${$scope.MonthSelected}/${$scope.YearSelected}`,
        //        "xAxisName": "Ngày",
        //        "yAxisName": "Số KM",
        //        "numberSuffix": " KM",
        //        "theme": "fusion",
        //    },
        //    "data": $scope.ActiviteMonth
        //};
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
                    $scope.init();
                });
            } 
                
        }
    }]);

