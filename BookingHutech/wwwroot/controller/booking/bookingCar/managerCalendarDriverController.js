mainmodule.controller('ManagerCalendarDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$alert', '$account','NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $alert, $account, NgTableParams) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.ClearData();
            $scope.getCalendar();
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
                DateFrom: '1900-1-1',
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
            var date_from = angular.element('#myDate1').val();
            var date_to = angular.element('#myDate2').val();

            if (So_Sanh_DateInput2(date_to, date_from) && checkDiffFromToDate1(date_from, date_to, 61) && date_from != "" && date_to != "") {

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
                    if (res.data.Data.ReturnCode == 1) {
                        toastr.success("Chuyến đi đã được bắt đầu.");
                        $scope.getCalendar();
                    }
                    else
                        toastr.error("Kiểm tra số KM đã nhập.");
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
                    if (res.data.Data.ReturnCode == 1) {
                        toastr.success("Chuyến đi đã được hoàn thành.");
                        $scope.getCalendar();
                    }
                    else
                        toastr.error("Kiểm tra số KM đã nhập.");
                });
            });
        }
    }]);  