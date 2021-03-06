﻿//Anh.create 15/4/2019. Tài khoản có quyền quản lý đơn cấp phát xe. ->Phòng quản trị 
mainmodule.controller('UnitDetailRegisterBKCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$stateParams', '$alert', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $stateParams, $alert, $account) { 
        var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 

        $scope.goToListUnitRegisterCar = function () {
            $state.go("main.unitRegisterBookingCar");
        }

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
                CarNo: null,
                CarStatus: null,
                CarImage: null,
                Expires: null,
                CarTypeName: null,
                InsuranceExpires: null,
                DriverID: null,
                FullNameDriver: null,
            }
            var DetalRegistrationCarResponse = [];
            $scope.tableParams = $scope.tableParams = null;
            if ($rootScope.CheckCookies() && $rootScope.CheckPermission(904)) {
                if (checkNull($stateParams.RegistrationCarID) || checkNull($stateParams.ProfileStatus)) {
                    toastr.success("Xin lỗi! Không tìm thấy kết quả");
                    $state.go("main.unitRegisterBookingCar");
                    return;
                }
                GetListRegistrationCarRequestModel.RegistrationCarID = $stateParams.RegistrationCarID;
                GetListRegistrationCarRequestModel.ProfileStatus = $stateParams.ProfileStatus;
                GetListRegistrationCarRequestModel.Unit_ID = AccountInfo.Unit_ID;

                $scope.GetListRegistrationCar(GetListRegistrationCarRequestModel);
               
            }
        }
        // Lấy danh sách đơn cấp phát theo MãKhoa/Viện
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
                        if (DetalRegistrationCarResponse == null || DetalRegistrationCarResponse.length == 0) {
                            toastr.success("Xin lỗi! Không tìm thấy kết quả");
                            $state.go("main.unitRegisterBookingCar");
                        } else {

                            $scope.DetalRegistrationCar = {
                                RegistrationCarID: DetalRegistrationCarResponse[0].RegistrationCarID,
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
                                Note: DetalRegistrationCarResponse[0].Note,

                            }
                            $scope.CarInfo = {
                                CarImage: DetalRegistrationCarResponse[0].CarImage,
                                CarNo: DetalRegistrationCarResponse[0].CarNo,
                                CarID: DetalRegistrationCarResponse[0].CarID,
                                CarTypeName: DetalRegistrationCarResponse[0].CarTypeName,
                                FullNameDriver: DetalRegistrationCarResponse[0].FullNameDriver,
                                DriverID: DetalRegistrationCarResponse[0].DriverID,
                            }
                            // hiển thị thông tin xe.   
                            if (CheckProfileRegisterCar($scope.DetalRegistrationCar.Profile_Status)) {
                                $scope.isCarInfo = true;
                            }
                            // loại xe 
                            $scope.ListUserChooseCarType = angular.fromJson($scope.DetalRegistrationCar.CarTypeNameRequest);
                        }
                        break;
                }


            });
        } 
        $scope.init(); 
       

        // Button trưởng khoa duyệt. 
        $scope.btnDeanVerify = function () {
            if ($rootScope.CheckCookies()) {
                var DeanVerifyRequestModel = {
                    RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                    Profile_Status: RegistrationStatus[1].RegistrationStatusType,
                    UserNameUpdate: AccountInfo.FullName,
                    Note: $scope.DetalRegistrationCar.Note,
                }
                $alert.showConfirmUpdateNewProfile('Xác nhận duyệt đơn cấp phát này!', function () {
                    $BookingCar.UnitUpdateRegistrationCar(DeanVerifyRequestModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                toastr.success("Duyệt thành công");
                                $scope.goToListUnitRegisterCar();
                                break;
                        }

                    });
                }); //end
            }

        }
        // Hủy trưởng khoa không duyệt
        $scope.btnDeanNotVerify = function () {
            if ($rootScope.CheckCookies()) {
                var DeanNotVerifyRequestModel = {
                    RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                    Profile_Status: RegistrationStatus[2].RegistrationStatusType,
                    UserNameUpdate: AccountInfo.FullName,
                    Note: $scope.DetalRegistrationCar.Note,
                }
                $alert.showConfirmUpdateNewProfile('Xác nhận hủy không duyệt đơn cấp phát này!', function () {
                    $BookingCar.UnitUpdateRegistrationCar(DeanNotVerifyRequestModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                toastr.success("Hủy thành công");
                                $scope.goToListUnitRegisterCar();
                                break;
                        }
                    });
                }); //end
            } 
        }
        // Button chỉnh sửa. 
        $scope.btnEditProfile = function () {
            if ($rootScope.CheckCookies()) { 
                var modalInstance = $modal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/wwwroot/views/pages/booking/bookingCar/popupEditRegisterBookingCar.html',
                    controller: 'EditRegisterBookingCarController',
                    controllerAs: 'content',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        EditRegisterRequestData: function () {
                            return $scope.DetalRegistrationCar;
                        },
                    }
                });
                modalInstance.result.then(function () {
                    $scope.init(); 
                });
            }
        }

        // xóa đơn cấp phát
        $scope.btnDeleteProfile = function () {
            if ($rootScope.CheckCookies()) {
                var DeleteRequestModel = {
                    RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID, 
                }
                if (checkNull(DeleteRequestModel.RegistrationCarID)) {

                }
                $alert.showConfirmUpdateNewProfile('Xác nhận xóa đơn cấp phát này!', function () {
                    $BookingCar.DeleteRegistrationCar(DeleteRequestModel, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                toastr.success("Xóa thành công");
                                $scope.goToListUnitRegisterCar();
                                break;
                        }

                    });
                }); //end
            }
        }
    }]);

