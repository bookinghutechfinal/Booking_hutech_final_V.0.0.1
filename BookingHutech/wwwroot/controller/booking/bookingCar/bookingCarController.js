mainmodule.controller('BookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar','$alert',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, $alert) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.CountListCar = 0; // Kết quả tìm kiếm 
            $rootScope.ListCarInfo = []; // Danh sách xe. 
            $rootScope.ListCarTypeInfo = []; // Danh sách loại xe. 
            $rootScope.ListCarInfoResult = [];    //Danh sách xe-> Kết quả tìm kiếm

            $scope.getListCar();
        }

        $scope.numPag = 10;
        // Hàm Lấy danh sách xe còn hoạt động và danh sách loại xe. . 
        $scope.getListCar = function () {
            var getListcarRequestModel = {
                CarStatus1: 0,//xe đã xóa
                CarStatus2: 1000 //không có điều kiện
            }

            $BookingCar.getListCar(getListcarRequestModel, function (res) {
                var listCar = res.data.Data.ListCar;
                var listCarType = res.data.Data.ListCarType;
                if (res.data.ReturnCode === 1) {
                    $rootScope.ListCarInfo = listCar;  // danh sách car hoạt động 
                    $rootScope.ListCarTypeInfo = listCarType;  // danh sách loại car hoạt động 
                }

            });
        }
        

        $scope.ShowListCars = false;
        $scope.init();
        $scope.ClearData = function () {
            $rootScope.ListCarInfoResult = []; // Xóa lưới
            $scope.CountListCar = 0; // Kết quả tìm kiếm 
            $rootScope.ListCarInfo = [];
        }

        //Tìm kiếm xe
        $scope.searchCar = function (request) {

            $scope.SearchModelReq = { 
                CarTypeID: request.CarTypeID
            } 
            $scope.ClearData();
            $scope.ShowListCars = true;

            if (request.CarTypeID != 'all') {
                $BookingCar.getListCarByCartypeID($scope.SearchModelReq, function (res) {
                    if (res.data.ReturnCode === 1) {
                        $rootScope.ListCarInfoResult = res.data.Data.ListCar;  // danh sách car hoạt động   
                    }
                    $scope.CountListCar = $rootScope.ListCarInfoResult.length;
                    if (checkNull_0($scope.CountListCar)) {
                        //toastr.success($rootScope.initMessage('LoginSuccess'));
                        toastr.success("Xin lỗi! Không tìm thấy xe phù hợp.\n Vui lòng chọn lại.");
                    }
                }); // End get data
            }
            else {
                $scope.getListCar();
                $scope.ShowListCars = false;
            }
        }

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

    }]);  