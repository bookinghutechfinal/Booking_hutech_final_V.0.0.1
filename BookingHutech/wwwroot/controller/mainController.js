
// vùng hiển thị dự liệu chính. 
mainmodule.controller('mainController', ['$scope', 'Idle', 'Keepalive', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, Idle, Keepalive, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {


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
            $cookies.remove("myReload");
            $state.go('login');
        }
        $rootScope.showError = false;
        $scope.Functiontimeout = function () {
            $rootScope.isLoading = true;
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            //toastr.error($rootScope.initMessage('InconrectSestion'));
            $state.go('login'); 
        } // end


        try {
            var AccountInfo = $account.getAccountInfo();
            //*** Hàm 2:  kiểm tra quyền show menu & layout tương ứng. 
            $rootScope.showByPermission = function (permissionCode) {
                var Role = AccountInfo.ObjRoleCode;
                for (var i = 0; i < Role.length; i++) {
                    if (Role[i].RoleCode === permissionCode) {
                        return true;
                    }
                }
                return false;
            }

            var result = CheckAccountLoginAndChangePass(AccountInfo);
            switch (result) {
                case 1:
                    $scope.Functiontimeout();
                    //  $state.go('login');
                    break;
                case 2:
                    $scope.goToChangePassword();
                    break;
                case 3:
                    $scope.UserName = AccountInfo.ObjAccountInfo.FullName;
                    $rootScope.isLoading = false;
                    //if (parseInt($cookies.get('myReload')) == 1) {
                    //    $rootScope.isLoading = true;
                    //    location.reload();
                    //    $cookies.put('myReload', 0);
                    //}
                    break;
            }
        }
        catch (err) {
            $scope.Functiontimeout();
        }



        $scope.logout = function () { 
            try {
                var AccountInfo = $account.getAccountInfo();
                $scope.reqLogout = {
                    Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
                }
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
            } catch (e) {
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload"); 
                toastr.error($rootScope.initMessage('InconrectSestion'));
                $state.go("login");
            }

        }



        //// Mỡ popup xem chi tiết profile 
        $scope.OpenPopupShowProfile = function () {
            try {
                var AccountInfo = $account.getAccountInfo();
                // Lấy chi tiết account. 
                var modalInstance = $modal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/wwwroot/views/pages/account/popupProfileAccount.html',
                    controller: 'ProfileAccountController',
                    controllerAs: 'content',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        AccountIDRequest: function () {
                            return AccountInfo.ObjAccountInfo.Account_ID;
                        },
                    }
                });
                modalInstance.result.then(function () {

                });
            }
            catch (err) {
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
                $state.go("login");

            }
        }


        // Anh.Set timeout

        function closeModals() {
            if ($scope.warning) {
                $scope.warning.close();
                $scope.warning = null;
            }

            if ($scope.timeout) {
                $scope.timeout.close();
                $scope.timeout = null;
            }
        }
        $scope.$on('IdleStart', function () {
            $scope.warning = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/warning-dialog.html',
                controller: 'ModalInstanceCtrl',
                //controllerAs: 'pc',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'sm',
                resolve: {
                    data: function () {
                        return null;
                    }
                }
            });

            $scope.warning.result.then(function () {
                console.log('Warning modal is closing now...');
            });
        });

        $scope.$on('IdleTimeout', function () {
            console.log('Idle timeout');
            closeModals();
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            toastr.error("Phiên làm việc của bạn đã hết hạn!");
            $scope.timeout = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/timeout-dialog.html',
                controller: 'ModalInstanceCtrl',
                //controllerAs: 'pc',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'sm',
                resolve: {
                    data: function () {
                        return null;
                    }
                }
            });

            // Your log out code goes here
            console.log('Your log out code may goes here...');

            $scope.timeout.result.then(function () {
                console.log('Timeout modal is closing now...');
            });
        });


        $scope.$on('IdleEnd', function () {
            console.log('Start closing warning modal');
            closeModals();
        });

       // Idle.watch(); // start set timeout
        //end 

    }]);
mainmodule.controller('ModalInstanceCtrl', ['$scope', '$state', '$modal', '$modalInstance', function ($scope, $state, $modal, $modalInstance) {

    $scope.Login = function () {
        $modalInstance.close();
        location.reload();
        $state.go('login');
    }

}]);


