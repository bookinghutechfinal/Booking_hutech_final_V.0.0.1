mainmodule.controller('ManagerCalendarDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$alert', '$account','NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $alert, $account, NgTableParams) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.tableParams = $scope.tableParams = null;

            $scope.getCalendar();
        }

        $scope.getCalendar = function () {
            var request = {
                DriverID: AccountInfo.ObjAccountInfo.Account_ID,
                Profile_Status1: 4,
                Profile_Status2: 7,
                Profile_Status3: 9
            }

            $BookingCar.getRegistrationCarByDriverID(request, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        var result = res.data.Data.GetRegistrationCarByCarID;
                        if (result.lenght == 0) {
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

        $scope.init();

        $scope.start = function () {
            $alert.showUpdateDistance($rootScope.initMessage('Vui lòng nhập số KM hiện tại'), function () {
                toastr.success("Chuyến đi đã được bắt đầu.");
            });
        }
        $scope.finish = function () {
            $alert.showUpdateDistance($rootScope.initMessage('Vui lòng nhập số KM hiện tại'), function () {
                toastr.success("Chuyến đi đã được hoàn thành.");
            });
        }
    }]);  