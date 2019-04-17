//Anh.create 15/4/2019. Tài khoản có quyền quản lý đơn cấp phát xe. ->Phòng quản trị 
mainmodule.controller('ManagerRegisterBookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.init = function () {
            var GetListRegistrationCarRequestModel = {
                ProfileStatus: null,
                RegistrationCarID: null,
                Unit_ID: null
            }
            var ListRegistrationCarResponse = [];
            $scope.tableParams = $scope.tableParams = null;
            GetListRegistrationCarRequestModel.ProfileStatus = 2; 
            $scope.getListRepairCost(GetListRegistrationCarRequestModel);
        }
        
        $scope.getListRepairCost = function (request) {
            GetListRegistrationCarRequestModel = {
                ProfileStatus: request.ProfileStatus,
                RegistrationCarID: request.RegistrationCarID,
                Unit_ID: request.Unit_ID
            } 
            $BookingCar.ManagerGetListRegistrationCar(GetListRegistrationCarRequestModel, function (res) { 
                switch (res.data.ReturnCode) {
                    case 1:
                        ListRegistrationCarResponse = res.data.Data.ListRegistrationCar;
                        if (ListRegistrationCarResponse.length == 0) {
                            toastr.success("Không có dự liệu");
                        } else {
                            $scope.tableParams = new NgTableParams({}, { dataset: ListRegistrationCarResponse });
                        }
                        break;
                }
                
               
            });
        }

        $scope.init();

        //$scope.popupDetailRepairCost = function (request) {
        //    var RepairIDRequestModel = {
        //        RepairID: request,
        //    }

        //    $BookingCar.getDetailRepairCost(RepairIDRequestModel, function (response) {
        //        switch (response.data.ReturnCode) {
        //            case 1:
        //                var ListDetailRepairCostResponseModel = response.data.Data.ListRepairCost;
        //                var modalInstance = $modal.open({
        //                    animation: true,
        //                    ariaLabelledBy: 'modal-title',
        //                    ariaDescribedBy: 'modal-body',
        //                    templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupDetailRepairCost.html',
        //                    controller: 'popupManagerRepairCostController',
        //                    controllerAs: 'content',
        //                    backdrop: 'static',
        //                    size: 'lg',
        //                    resolve: {
        //                        ListDetailRepairCost: function () {
        //                            return ListDetailRepairCostResponseModel;
        //                        },
        //                    }
        //                });
        //                modalInstance.result.then(function () {

        //                });


        //                break;

        //        }

        //    });
            
        //}

        //$scope.addNewCost = function () {

        //    var modalInstance = $modal.open({
        //        animation: true,
        //        ariaLabelledBy: 'modal-title',
        //        ariaDescribedBy: 'modal-body',
        //        templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupAddNewCost.html',
        //        controller: 'popupManagerRepairCostController',
        //        controllerAs: 'content',
        //        backdrop: 'static',
        //        size: 'lg',
        //        resolve: {
        //            ListDetailRepairCost: function () {
        //                return null;
        //            },
        //        }
        //    });
        //    modalInstance.result.then(function () {

        //    });

        //}
    }]);

//mainmodule.controller('popupManagerRepairCostController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', 'ListDetailRepairCost','$modalInstance',
//    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, ListDetailRepairCost, $modalInstance) {

//        $scope.init = function () {
//            var ListDetailRepairCostResponseModel = ListDetailRepairCost;
//            $scope.tableParams2 = new NgTableParams({}, { dataset: ListDetailRepairCostResponseModel });
//        }

//        $scope.ClosePopup = function () {
//            $modalInstance.close();
//        }

//        $scope.init();

//    }]);  