mainmodule.controller('HomeController', ['$scope','$state',
    function($scope, $state) {

        $scope.goToLogin = function () {
            $state.go('main.login');
            return;
        };
        $scope.titleHome = 'Hello Trang chủ'; 

    }]);
           