﻿//Anh.create 15/4/2019. Tài khoản có quyền quản lý đơn cấp phát xe. ->Phòng quản trị 
mainmodule.controller('ManagerDetailRegisterBKCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$stateParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $stateParams) {

        $scope.init = function () {
            $scope.isCarInfo = false; // hiển thị thông tin xe
            var GetListRegistrationCarRequestModel = {
                ProfileStatus: null,
                RegistrationCarID: null,
                Unit_ID: null
            }
            $scope.DetalRegistrationCar = {
                UnitRequest: null,
                Reason: null,
                Leader: null,
                EmailLeader: null,
                NumberPhoneLeader: null,
                NumberPeople: null,
                Note: null, // loại xe được yêu cầu
                RouteTo: null, //Lộ trình đi 
                RouteBack: null, //Lộ trình vế 
                PlanDistanceTo: null, //Khoản cách dự định đến 
                PlanDistanceBack: null, //Khoản cách dự định đến 
                DateTimeFrom: null,
                DateTimeTo: null,
                Profile_Status: null,
                Profile_StatusName: null,
                CarTypeNameRequest: null,
                Account_ID: null,
                Unit_ID: null,
                Manager: null,
                UnitName: null,
                LastModifiedDate: null,
                EmailManager: null,
                CreatDay: null,

            }
            $scope.CarInfo = {
                CarID: null,
                CarImage: null,
                CarName: null,
                CarTypeID: null,
                CarTypeName: null,
                CarNo: null,
                DriverID: null,
            }
            var DetalRegistrationCarResponse = [];
            $scope.tableParams = $scope.tableParams = null;
            GetListRegistrationCarRequestModel.RegistrationCarID = $stateParams.RegistrationCarID;
            GetListRegistrationCarRequestModel.ProfileStatus = $stateParams.ProfileStatus;
            $scope.GetListRegistrationCar(GetListRegistrationCarRequestModel);
        }

        $scope.GetListRegistrationCar = function (request) {
            GetListRegistrationCarRequestModel = {
                ProfileStatus: request.ProfileStatus,
                RegistrationCarID: request.RegistrationCarID,
                Unit_ID: request.Unit_ID
            }
            $BookingCar.ManagerGetListRegistrationCar(GetListRegistrationCarRequestModel, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        DetalRegistrationCarResponse = res.data.Data.ListRegistrationCar;
                        if (checkNull(DetalRegistrationCarResponse)) {
                            toastr.success("Xin lỗi! Không tìm thấy kết quả");
                            $state.go("main.managerBookingCar");
                        } else {

                            $scope.DetalRegistrationCar = {
                                UnitRequest: DetalRegistrationCarResponse[0].UnitRequest,
                                Reason: DetalRegistrationCarResponse[0].Reason,
                                Leader: DetalRegistrationCarResponse[0].Leader,
                                EmailLeader: DetalRegistrationCarResponse[0].EmailLeader,
                                NumberPhoneLeader: DetalRegistrationCarResponse[0].NumberPhoneLeader,
                                NumberPeople: DetalRegistrationCarResponse[0].NumberPeople,
                                RouteTo: DetalRegistrationCarResponse[0].RouteTo, //Lộ trình đi 
                                RouteBack: DetalRegistrationCarResponse[0].RouteBack, //Lộ trình vế 
                                PlanDistanceTo: DetalRegistrationCarResponse[0].PlanDistanceTo, //Khoản cách dự định đến 
                                PlanDistanceBack: DetalRegistrationCarResponse[0].PlanDistanceBack, //Khoản cách dự định đến 
                                DateTimeFrom: DetalRegistrationCarResponse[0].DateTimeFrom,
                                DateTimeTo: DetalRegistrationCarResponse[0].DateTimeTo,
                                Profile_Status: DetalRegistrationCarResponse[0].Profile_Status,
                                Profile_StatusName: ConvertProfileCarStatusIDToName(DetalRegistrationCarResponse[0].Profile_Status),
                                CarTypeNameRequest: DetalRegistrationCarResponse[0].CarTypeNameRequest,
                                Manager: DetalRegistrationCarResponse[0].Manager,
                                UnitName: DetalRegistrationCarResponse[0].UnitName,
                                LastModifiedDate: DetalRegistrationCarResponse[0].LastModifiedDate,
                                EmailManager: DetalRegistrationCarResponse[0].EmailManager,
                                CreatDay: DetalRegistrationCarResponse[0].CreatDay,

                            }
                            // hiển thị thông tin xe.   
                            if (CheckProfileRegisterCar($scope.DetalRegistrationCar.Profile_Status)) {
                                $scope.isCarInfo = true;
                            }
                        }
                        break;
                }


            });
        }

        $scope.init();

        // check chọn xe.  
        $scope.CheckCarInfoRequest = function () {
            if (!checkNull($scope.CarInfo.CarImage)) {
                $scope.isCarInfo = true;
            }
        }
        // mở 
        $scope.OpenPopupSearchCar = function () {
            var SearchCarRequest = {
                DateTimeFrom: $scope.DetalRegistrationCar.DateTimeFrom,
                DateTimeTo: $scope.DetalRegistrationCar.DateTimeTo,
                CarTypeNameRequest: $scope.DetalRegistrationCar.CarTypeNameRequest,
                NumberPeople: $scope.DetalRegistrationCar.NumberPeople,
            }
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupSearchCar.html',
                controller: 'PopupSearchCarController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    SearchCarRequestModel: function () {
                        return SearchCarRequest;
                    },
                }
            });
            modalInstance.result.then(function () {

            });

        }
    }]);

mainmodule.controller('PopupSearchCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', 'SearchCarRequestModel', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, SearchCarRequestModel, $modalInstance) {

        $scope.init = function () {
            $scope.CarInfoRespon = [];
            // $scope.tableParams2 = new NgTableParams({}, { dataset: ListDetailRepairCostResponseModel });
            // alert(SearchCarResponseModel.CarTypeNameRequest); 
            try {
                var SearchCarResponseModel = SearchCarRequestModel;
                $scope.SearchCarRequest = {
                    DateTimeFrom: SearchCarResponseModel.DateTimeFrom,
                    DateTimeTo: SearchCarResponseModel.DateTimeTo,
                    CarTypeNameRequest: SearchCarResponseModel.CarTypeNameRequest,
                    NumberPeople: SearchCarResponseModel.NumberPeople,
                } 
            } catch (e) {
                $scope.ClosePopup(); 
            }
        }
         
        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  