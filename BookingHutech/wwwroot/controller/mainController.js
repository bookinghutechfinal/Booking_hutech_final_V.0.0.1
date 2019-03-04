
// vùng hiển thị dự liệu chính. 
mainmodule.controller('mainController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {


        $scope.goToChangePassword = function () {
            $state.go('changePassword');
            return;
        };
        $scope.goToLogin = function () {
            $state.go('login');
            return;
        };
        var AccountInfo = $account.getAccountInfo();
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 1:
                $scope.goToLogin();
                break;
            case 2:
                $scope.goToChangePassword();
                break;
            case 3:
                $scope.UserName = AccountInfo.ObjAccountInfo.FullName;
                break;
        }

        $scope.logout = function () {

            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/popupLogout.html',
                controller: 'LogoutController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'sm',
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



