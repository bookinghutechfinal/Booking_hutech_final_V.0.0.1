mainmodule.controller('BookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', '$alert', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $alert, $account) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $rootScope.ListCarInfo = []; // Danh sách xe.  
            try {
                var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
                var testCookies = AccountInfo.ObjAccountInfo.Account_ID;
                // ném code của bạn vào trong này 
                $scope.getListCar();
                // ném code của bạn vào trong này 
            } catch (e) {
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
            }
        }

        $scope.numPag = 20;
        // Hàm Lấy danh sách xe còn hoạt động và danh sách loại xe. . 
        $scope.getListCar = function () {
            var getListcarRequestModel = {
                CarStatus1: 1000,//xe đã xóa
                CarStatus2: 1000 //không có điều kiện
            }
            $BookingCar.getListCar(getListcarRequestModel, function (res) {
                var listCar = res.data.Data.ListCar;
                if (res.data.ReturnCode === 1) {
                    $scope.ListCarInfo = listCar;  // danh sách car hoạt động 
                }

            });
        }

        $scope.init();

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



        $scope.AddNewCar = function () {
            try {
                var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
                var testCookies = AccountInfo.ObjAccountInfo.Account_ID;
                // ném code của bạn vào trong này 
                var modalInstance = $modal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewCar.html',
                    controller: 'AddNewCarController',
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
                // ném code của bạn vào trong này 
            } catch (e) {
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                toastr.error($rootScope.initMessage('InconrectSestion'));
                //  $state.go("login"); 
                $rootScope.showError = true;
            }
        }


    }]);  