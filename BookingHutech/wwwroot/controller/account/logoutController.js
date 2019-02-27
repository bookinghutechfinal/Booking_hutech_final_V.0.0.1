 
mainmodule.controller('LogoutController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $modalInstance) {
        $scope.UserName = "Trần Nhựt Anh";
        
        $scope.close = function () {
            $modalInstance.close();
        }
        $scope.yes = function () {

        }


    }]);  