
// vùng hiển thị dự liệu chính. 
mainmodule.controller('mainController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {


        $scope.gotoHome = function () {
            $state.go('main.home');
            location.reload(); 
            return;
        };
        $scope.goToChangePassword = function () {
            $state.go('changePassword');
            return;
        };
        $scope.goToLogin = function () {
            toastr.error("Vui lòng đăng nhập!");
            $state.go('login');
            return;
        };
        $scope.Error = function () { 
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $state.go('login'); 
            location.reload(); 
        }
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



