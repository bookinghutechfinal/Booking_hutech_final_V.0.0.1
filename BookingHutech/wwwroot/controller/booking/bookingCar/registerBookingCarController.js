 
mainmodule.controller('RegisterBookingCarController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr',   '$modalInstance',
function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance) {

    $scope.Titile = "Đặt Xe"; 
    $scope.ClosePopup = function () {
        debugger
          $modalInstance.close();
        }
      

    }]);  