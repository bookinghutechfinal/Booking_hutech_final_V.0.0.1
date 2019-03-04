
mainmodule.controller('ChangePasswordController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {

        $scope.goToLogin = function () {
            $state.go('login');
            return;
        };
        $scope.goToHome = function () {
            $state.go('main.home');
            return;
        };
        var AccountInfo = $account.getAccountInfo();
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 1:
                $scope.goToLogin();
                break;
            case 2:
                $scope.AccountName = AccountInfo.ObjAccountInfo.FullName;
                break;
            case 3:
                $scope.goToHome();
                break;
        }

    }]);  