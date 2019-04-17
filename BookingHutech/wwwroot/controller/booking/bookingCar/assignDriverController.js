mainmodule.controller('AssignDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$alert', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $alert, $account) {

        $scope.init = function () {
            $scope.DriverWithCar = [];

            $scope.ManagerGetListAccount();
            $scope.GetDriverWithCar();
        }

        //Get list driver
        $scope.ManagerGetListAccount = function () {
            $account.GetListDriverNotInAssignDriver({}, function (res) {
                switch (res.data.ReturnCode) {

                    case 1:
                        $scope.ManagerGetListAccountResponse = res.data.Data.GetAccountInfo;
                        break;
                }
            });
        }

        $scope.GetDriverWithCar = function () {
            $BookingCar.GetListAssignDriver({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ListAssignDriver = res.data.Data;
                        break;
                }
            });
        }

        $scope.init();

        $scope.updateAssign = function () {
            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn cập nhật phân công?'), function () {
                toastr.success('Cập nhật thành công.');
            });
        }
    }]);

mainmodule.controller('popupAssignDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  