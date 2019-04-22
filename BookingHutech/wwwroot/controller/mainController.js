
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
            $state.go('login');
            location.reload();
        }
      
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
        }
        catch (err) {
            $scope.goToLogin();
        }
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

        //// Mỡ popup xem chi tiết profile 
        $scope.OpenPopupShowProfile = function () {
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
                    RequestData: function () {
                        return null;
                    },
                }
            });
            modalInstance.result.then(function () {

            });
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



        // Anh.Set timeout
        var pc = this;
        pc.data = "You're Idle. Do Something!!!";
        $scope.started = false;

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
                        return pc.data;
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
                        return pc.data;
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
         
        //Idle.watch(); // start set timeout
        //end 

    }]);
mainmodule.controller('ModalInstanceCtrl', ['$scope', 'data', '$state', '$modal', '$modalInstance', function ($scope, data, $state, $modal, $modalInstance) {
   var pc = this;
    pc.title = data;
    $scope.Login = function () {
        $modalInstance.close();
        $state.go('login');   
    }
    
}]);


 