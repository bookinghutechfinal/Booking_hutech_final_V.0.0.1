mainmodule.controller('HomeController', ['$scope', '$state', 'toastr', '$modal', '$account','$cookies',
    function ($scope, $state, toastr, $modal, $account, $cookies) {

        $scope.goToBookingCar = function () {
            $state.go('main.bookingcar');
        };
        $scope.bookingCar = function () {
            $scope.goToBookingCar();
        } 
        $scope.goTobookingMeetingHall = function () {
            $state.go('main.bookingMeetingHall');
        };
        $scope.bookingMeetingHall = function () {
            $scope.goTobookingMeetingHall();
        }
        // Tạm nhét đặt xe vào đây. 
        $scope.OpenPopupRegisteredBookingCar = function () {
            try {
                var AccountInfo = $account.getAccountInfo();
                $scope.reqLogout = {
                    Account_ID: AccountInfo.ObjAccountInfo.Account_ID,
                }

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

            } catch (e) {
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
                $state.go("login");
            }

        }

    }]);
