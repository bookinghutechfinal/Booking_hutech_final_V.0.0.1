
// vùng hiển thị dự liệu chính. 
mainmodule.controller('mainController', ['$scope', 'Idle', 'Keepalive', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao', '$account',
    function ($scope, Idle, Keepalive, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $account) {

        var AccountInfo = $account.getAccountInfo();
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
            $account.RemoveAccountInfo(); 
            $state.go('login');
        }
       
        $scope.btnCheckOnline = function () {
            $rootScope.isTimeOutRequest = false; 
            $rootScope.isLoading = false; 
        }
        $scope.btnCheckNoConnect = function () {
            $rootScope.online = true;
            localtion.reload(); 
        }
        // kiểm tra cookies
        $rootScope.CheckCookies = function () {
            try {
                var AccountInfo = $account.getAccountInfo().Account_ID; // test Lấy cookies người dùng.  
                return true; 
            } catch (e) {  
                var audio = new Audio('../../audio/alert_message_audio.mp3');
                audio.play();
                audio.volume = 0.1; 
                $account.RemoveAccountInfo(); 
                toastr.error($rootScope.initMessage('InconrectSestion')); 
                $rootScope.showError = true;
                return false; 
            }
             
        }
        // hàm kiểm tra quyền thự hiện các hàm tự động thực hiện khi truy cầp vào màn hình 
        // vd: màn hình quản lý đơn cấp phát cấp khoa/viện, cấp quản tri không được gọi hàm, xem danh sách
        $rootScope.CheckPermission = function (permissionCode) {
            try {
                var AccountInfo = $account.getAccountInfo().Account_ID; // test Lấy cookies người dùng. 
                if ($rootScope.showByPermission(permissionCode)) {
                    return true;
                } else {
                    var audio = new Audio('../../audio/alert_message_audio.mp3');
                    audio.play();
                    audio.volume = 0.1; 
                    toastr.error($rootScope.initMessage('NotPermission')); 
                    return false; 
                }
               
            }// lỗi
            catch (e) {  
                var audio = new Audio('../../audio/alert_message_audio.mp3');
                audio.play();
                audio.volume = 0.1; 
                $account.RemoveAccountInfo(); 
                toastr.error($rootScope.initMessage('InconrectSestion'));  
                $rootScope.showError = true; 
            } 
        }


        $rootScope.showError = false;
        $scope.Functiontimeout = function () {
            var audio = new Audio('../../audio/alert_message_audio.mp3');
            audio.play();
            audio.volume = 0.1;
            $account.RemoveAccountInfo(); 
            $rootScope.isLoading = true; 
            //toastr.error($rootScope.initMessage('InconrectSestion'));
            $state.go('login');
        } // end


        try {
           // var AccountInfo = $account.getAccountInfo();
            var getRoleCode = $account.getRoleCode();
            //*** Hàm 2:  kiểm tra quyền show menu & layout tương ứng. 
            $rootScope.showByPermission = function (permissionCode) { 
                for (var i = 0; i < getRoleCode.length; i++) {
                    if (getRoleCode[i].RoleCode === permissionCode) {
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
                    $scope.UserName = AccountInfo.FullName;
                    $rootScope.isLoading = false; 
                    break;
            }
        }
        catch (err) {
            $scope.Functiontimeout();
        }


        // logout
        $scope.logout = function () {
            try {
                var AccountInfo = $account.getAccountInfo();
                $scope.reqLogout = {
                    Account_ID: AccountInfo.Account_ID,
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
                $account.RemoveAccountInfo(); 
                toastr.error($rootScope.initMessage('InconrectSestion'));
                $state.go("login");
            }

        }
          
        // Mỡ popup xem chi tiết profile 
        $scope.OpenPopupShowProfile = function () {
            if ($rootScope.CheckCookies()) {
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
                            return AccountInfo.Account_ID;
                        },
                    }
                });
                modalInstance.result.then(function () {

                });
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
            $account.RemoveAccountInfo(); 
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

         Idle.watch(); // start set timeout
        //end 
        //// Cảnh báo mất kết nối internet 
        //if (!$rootScope.online) {
        //    alert("Cảnh báo! Mất kết nối internet. Vui lòng kiểm tra lại kết nối mạng!");
        //} else {
        //    alert("Ok ổn");
        //}
    }]);
mainmodule.controller('ModalInstanceCtrl', ['$scope', '$state', '$modal', '$modalInstance', function ($scope, $state, $modal, $modalInstance) {

    $scope.Login = function () {
        $modalInstance.close();
       // location.reload();
        $state.go('login');
    }

}]);


