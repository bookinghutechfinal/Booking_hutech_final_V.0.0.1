mainmodule.controller('HomeController', ['$scope', '$state', 'toastr', '$modal', '$account', '$cookies','$rootScope',
    function ($scope, $state, toastr, $modal, $account, $cookies, $rootScope) {

        var AccountInfo = $account.getAccountInfo();
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
        $scope.Init = function () {
            if ($rootScope.CheckCookies()) {
               // code
            }  
        }
        $scope.Init(); 
        // Tạm nhét đặt xe vào đây. 
        $scope.OpenPopupRegisteredBookingCar = function () { 
            if ($rootScope.CheckCookies()) {
                $scope.reqLogout = {
                    Account_ID: AccountInfo.Account_ID,
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
            }
        }

        
    }]);
