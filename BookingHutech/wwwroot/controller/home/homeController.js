mainmodule.controller('HomeController', ['$scope', '$state', 'toastr','$modal',
    function ($scope, $state, toastr, $modal) {

        $scope.goToBookingCar = function () {
            $state.go('main.bookingcar'); 
        };
        $scope.bookingCar = function () {
            $scope.goToBookingCar(); 
        }
        
        

        $scope.goTobookingMeetingHall = function () {
            $state.go('main.bookingMeetingHall');
        };
        $scope.bookingMeetingHall = function () {
            $scope.goTobookingMeetingHall();
        }
        // Tạm nhét đặt xe vào đây. 
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
           