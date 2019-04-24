mainmodule.controller('AddNewCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance','$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.CarInfo = {
                CarID: null,
                CarName: null,
                CarNo: null,
                CarTypeID: null,
                CarStatus: null,
                CarImage: null,
                Expires: null,
                InsuranceExpires: null,
                FullNameUpdate: null
            }
            $scope.getCarType();
        }

        $scope.getCarType = function () {
            $BookingCar.getListCarType({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.listCarType = res.data.Data;
                        break;
                }
            });
        }

        $scope.init();

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.btndisabled = true;
        $scope.TestInputChange = function (Request) {
            if (checkNull(Request.CarName)) { 
                $scope.btndisabled = true;
                return;
            } else
                if (checkNull(Request.CarTypeID)) {
                $scope.btndisabled = true;
                return;
            } else
            if (angular.element('#myDate1').val() == 'Invalid date') {
                $scope.btndisabled = true;
                return;
            } else
            if (angular.element('#myDate2').val() == 'Invalid date') {
                $scope.btndisabled = true;
                return;
            } else
            if (checkNull(Request.CarNo)) {
                $scope.btndisabled = true;
                return;
            } 
            $scope.btndisabled = false;
        } 
        
    }]);  