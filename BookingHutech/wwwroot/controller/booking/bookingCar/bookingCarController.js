 mainmodule.controller('BookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao) {
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