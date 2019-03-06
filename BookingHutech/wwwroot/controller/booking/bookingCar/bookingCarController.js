mainmodule.controller('BookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao','$BookingCar',
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao, $BookingCar) {

        // Hàm 1: khai báo các biến tiện ích
        $scope.init = function () {
            $scope.CountListCar = 0; // Kết quả tìm kiếm 
            $rootScope.ListCarInfo = []; // Danh sách xe. 
            $rootScope.ListCarTypeInfo = []; // Danh sách loại xe. 
            $rootScope.ListCarInfoResult = [];    //Danh sách xe-> Kết quả tìm kiếm

            $scope.getListCar();
            $scope.getListCarType();
        }

        // Hàm 2: Lấy danh sách xe còn hoạt động và danh sách loại xe. . 
        $scope.getListCar = function () {
            $BookingCar.getListCar({}, function (res) {
                var listCar = res.data.Data;
                if (res.data.ReturnCode === 1) {
                    $rootScope.ListCarInfo = listCar;  // danh sách car hoạt động 
                }

            });
        }

        $scope.getListCarType = function () {
            $BookingCar.getListCarType({}, function (res) {
                var listCarType = res.data.Data;
                if (res.data.ReturnCode === 1) {
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
            //4.1.  Lưu trữ ngày giờ đi về và xe tiện cho việc làm phiếu đặt xe và lưu lại lịch sử tìm xe.
            //$cookies.putObject("ProfileReqModel", request); 
            $scope.SearchModelReq = { 
                CarTypeID: request.CarTypeID
            } 
            $scope.ClearData();
            $scope.ShowListCars = true;
            //4.4  Câp nhật lại danh sách xe. 
            //     Lấy lên danh sách đơn đăng ký của tất cả các loại xe để kiểm tra thỏa điều kiện hiển thị danh sách xe thỏa điều kiện tìm kiếm.
            $BookingCar.getListCarByCartypeID($scope.SearchModelReq, function (res) { 
                if (res.data.ReturnCode === 1) { 
                    $rootScope.ListCarInfoResult = res.data.Data;  // danh sách car hoạt động   
                }
                $scope.CountListCar = $rootScope.ListCarInfoResult.length;
                if (checkNull_0($scope.CountListCar)) {
                    //toastr.success($rootScope.initMessage('LoginSuccess'));
                    toastr.success("Xin lỗi! Không tìm thấy xe phù hợp.\n Vui lòng chọn lại.");
                }
            }); // End get data

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
        }

    }]);  