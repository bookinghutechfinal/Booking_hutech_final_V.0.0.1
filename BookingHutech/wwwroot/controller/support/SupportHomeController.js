mainmodule.controller('SupportHomeController', ['$scope', '$state','toastr',
    function ($scope, $state, toastr) {

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
       
    }]);
           