mainmodule.controller('HomeController', ['$scope','$state',
    function($scope, $state) {

        $scope.goToBookingCar = function () {
            $state.go('main.bookingcar'); 
        };
        $scope.bookingCar = function () {
            $scope.goToBookingCar(); 
        }

    }]);
           