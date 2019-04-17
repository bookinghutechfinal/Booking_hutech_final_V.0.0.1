mainmodule.controller('popupAddNewCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
            $scope.costInfo = {
                RepairID: null,
                CostsTypeID: null,
                Car_ID: null,
                CreateDate: null,
                Note: null,
                RepairAddres: null,
                AccountCreate: null,
                FullNameUpdate: null,
                Content: null,
                Quantity: null,
                TotalMoney: null
            }
            $scope.getListCar();
        }

        //Lấy danh sách xe
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

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  