mainmodule.controller('BookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$BookingCar',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $BookingCar) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $rootScope.ListCarInfo = []; // Danh sách xe. 
            $rootScope.ListCarTypeInfo = []; // Danh sách loại xe. 

            $scope.getListCar();
        }

        // Hàm 2: Lấy danh sách xe còn hoạt động và danh sách loại xe. . 
        $scope.getListCar = function () {
            $BookingCar.getListCar({}, function (res) {
                var listCar = res.data.Data.Data.CarInfo;
                var listCarType = res.data.Data.Data.CarTypeInfo;
                if (res.data.ReturnCode === 1) {

                    $rootScope.ListCarInfo = listCar;  // danh sách car hoạt động 
                    $rootScope.ListCarTypeInfo = listCarType;  // danh sách loại xe
                }

            });
        }

        $scope.init();

        $scope.serachCar = "Tìm kiếm xe";
        //$scope.close = function () {
        //    $modalInstance.close();
        //}
        //$scope.yes = function () {

        //}
        $scope.OpenPopupRegisteredBookingCar = function () {
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupRegisterBookingCar.html',
                controller: 'RegisterBookingCarController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    RequestData: function () {
                        return null;
                    },
                }
            });
            modalInstance.result.then(function () {

            });

        }

    }]);  