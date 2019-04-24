mainmodule.controller('BookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar','$alert',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $alert) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $rootScope.ListCarInfo = []; // Danh sách xe. 

            $scope.getListCar();
        }

        $scope.numPag = 20;
        // Hàm Lấy danh sách xe còn hoạt động và danh sách loại xe. . 
        $scope.getListCar = function () {
            var getListcarRequestModel = {
                CarStatus1: 0,//xe đã xóa
                CarStatus2: 1000 //không có điều kiện
            }

            $BookingCar.getListCar(getListcarRequestModel, function (res) {
                var listCar = res.data.Data.ListCar;
                if (res.data.ReturnCode === 1) {
                    $scope.ListCarInfo = listCar;  // danh sách car hoạt động 
                }

            });
        }

        $scope.init();

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

        $scope.AddNewCar = function () {
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewCar.html',
                controller: 'AddNewCarController',
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