﻿mainmodule.controller('ManagerCalendarDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$alert', '$account', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $alert, $account, NgTableParams) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.ClearData();
            $scope.getCalendar();
            $scope.getCarInfo();
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
                    $scope.DetailCar = true;
                } else {
                    $scope.DetailCar = false;
                }

            });
        }

        $scope.getCalendar = function () {

            $scope.ErrorDay = false;
            $scope.ShowListCalendar = false;
            $scope.ClearData();
            angular.element('#myDate1').val("");
            angular.element('#myDate2').val("");

            var request = {
                DriverID: AccountInfo.ObjAccountInfo.Account_ID,
                Profile_Status1: 4,
                Profile_Status2: 7,
                Profile_Status3: 9,
                DateFrom: '1-1-1900',
                DateTo: new Date()
            }

            $BookingCar.getRegistrationCarByDriverID(request, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        var result = res.data.Data.GetRegistrationCarByCarID;
                        if (result.length == 0) {
                            toastr.error("Bạn chưa có đơn đặt xe.");
                        }
                        $scope.tableParams = new NgTableParams({}, { dataset: result });
                        break;
                    case 2:
                        toastr.error("Bạn chưa có đơn đặt xe.");
                        break;
                }
            });
        }

        $scope.ShowListCalendar = false;
        $scope.ClearData = function () {
            $scope.tableParams = $scope.tableParams = null;
            $scope.tableParams1 = $scope.tableParams1 = null;
        }

        $scope.searchCalendar = function () {
            var date_from = FormatDateTimeToDBRequest(angular.element('#myDate1').val());
            var date_to = FormatDateTimeToDBRequest(angular.element('#myDate2').val());

            if (So_Sanh_DateInput2(date_to, date_from) && date_from != "Invalid date" && date_to != "Invalid date") {

                $scope.ErrorDay = false;
                $scope.ShowListCalendar = true;
                $scope.ClearData();

                var request1 = {
                    DriverID: AccountInfo.ObjAccountInfo.Account_ID,
                    Profile_Status1: 10,
                    Profile_Status2: 1111,
                    Profile_Status3: 1111,
                    DateFrom: date_from,
                    DateTo: date_to
                }

                $BookingCar.getRegistrationCarByDriverID(request1, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            var result = res.data.Data.GetRegistrationCarByCarID;
                            if (result.length == 0) {
                                toastr.error("Không có chuyến đi nào trong khoảng thời gian này.");
                            }
                            $scope.datefrom = date_from;
                            $scope.dateto = date_to;
                            $scope.tableParams1 = new NgTableParams({}, { dataset: result });
                            break;
                        case 2:
                            toastr.error("Không có chuyến đi nào trong khoảng thời gian này.");
                            break;
                    }
                });
            }
            else {
                $scope.ErrorDay = true;
            }
        }

        $scope.init();

        $scope.start = function (request) {
            $alert.showUpdateDistance($rootScope.initMessage('Vui lòng nhập số KM hiện tại'), function () {

                var requestModelStart = {
                    RegistrationCarID: request.RegistrationCarID,
                    Profile_Status: 9,
                    DistanceTo: $rootScope.alertValue,
                    DistanceBack: 0,
                    CarID: request.CarID
                }

                $BookingCar.updateRegistrationCarStatus(requestModelStart, function (res) { 
               
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Chuyến đi đã được bắt đầu.");
                            $scope.getCalendar();
                            break;
                        case 6:
                            toastr.error("Xin lỗi! Vui lòng kiểm tra lại số Km hiện tại của xe.");
                            break;
                    }
                });
            });
        }

        $scope.finish = function (request) {
            $alert.showUpdateDistance($rootScope.initMessage('Vui lòng nhập số KM hiện tại'), function () {

                var requestModelFinish = {
                    RegistrationCarID: request.RegistrationCarID,
                    Profile_Status: 10,
                    DistanceTo: request.DistanceTo,
                    DistanceBack: $rootScope.alertValue,
                    CarID: request.CarID
                }

                $BookingCar.updateRegistrationCarStatus(requestModelFinish, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Chuyến đi đã được hoàn thành.");
                            $scope.getCalendar();
                            break;
                        case 6:
                            toastr.error("Xin lỗi! Vui lòng kiểm tra lại số Km hiện tại của xe.");
                            break;
                    }
                });
            });
        }
    }]);  