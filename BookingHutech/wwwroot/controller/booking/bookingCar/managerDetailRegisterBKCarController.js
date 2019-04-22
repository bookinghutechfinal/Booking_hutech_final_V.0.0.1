//Anh.create 15/4/2019. Tài khoản có quyền quản lý đơn cấp phát xe. ->Phòng quản trị 
mainmodule.controller('ManagerDetailRegisterBKCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$stateParams', '$alert', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $stateParams, $alert, $account) {

        try {
            //ReturnAccountType($account.getAccountInfo().ObjAccountInfo);
            var AccountInfo = $account.getAccountInfo().ObjAccountInfo;
        }
        catch (err) {
            $scope.goToLogin();
        }
        $scope.goToListRegisterCar = function () {
            $state.go("main.managerBookingCar");
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
                        if (DetalRegistrationCarResponse == null || DetalRegistrationCarResponse.length == 0) {
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
                        }
                        break;
                }


            });
        }

        // kiểm tra quyền thức khi thực hiên 
        if ($scope.checkPermission = $rootScope.showByPermission(900)) {
            $scope.init();
        } else {
            toastr.error("Xin lỗi! Bạn không có quyền thực hiện chức năng này");
            return;
        }
        // check chọn xe.  
        $scope.CheckCarInfoRequest = function () {
            if (!checkNull($scope.CarInfo.CarImage)) {
                $scope.isCarInfo = true;
            }
        }
        // mở tìm xe trống
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
            modalInstance.result.then(function (result) {
                $scope.CarInfo = {
                    CarID: result.CarID,
                    CarNo: result.CarNo,
                    CarStatus: result.CarStatus,
                    CarImage: result.CarImage,
                    Expires: result.Expires,
                    CarTypeName: result.CarTypeName,
                    InsuranceExpires: result.InsuranceExpires,
                    DriverID: result.DriverID,
                    FullNameDriver: result.FullNameDriver,
                }
                $scope.CheckCarInfoRequest();
            });

        }

        // Button Quản trị duyệt. 
        $scope.btnAdminVerify = function () {
            var AdminVerifyRequestModel = {
                RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                Profile_Status: RegistrationStatus[3].RegistrationStatusType,
                UserNameUpdate: AccountInfo.FullName,
                CarID: $scope.CarInfo.CarID,
                DriverID: $scope.CarInfo.DriverID,
                Note: $scope.DetalRegistrationCar.Note,
            }
            $alert.showConfirmUpdateNewProfile('Xác nhận duyệt đơn cấp phát này!', function () {
                $BookingCar.ManagerUpdateRegistrationCar(AdminVerifyRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Duyệt thành công");
                            $scope.goToListRegisterCar();
                            break;
                    }

                });
            }); //end
        }
        // Hủy không duyệt
        $scope.AdminNotVerify = function () {
            var AdminVerifyRequestModel = {
                RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                Profile_Status: RegistrationStatus[4].RegistrationStatusType,
                UserNameUpdate: AccountInfo.FullName,
                Note: $scope.DetalRegistrationCar.Note,
            }
            $alert.showConfirmUpdateNewProfile('Xác nhận hủy không duyệt đơn cấp phát này!', function () {
                $BookingCar.ManagerUpdateRegistrationCar(AdminVerifyRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Hủy thành công");
                            $scope.goToListRegisterCar();
                            break;
                    }

                });
            }); //end
        }
        // Chờ BGH duyệt
        $scope.btnWaitingForSchoolVerify = function () {
            var AdminVerifyRequestModel = {
                RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                Profile_Status: RegistrationStatus[5].RegistrationStatusType,
                UserNameUpdate: AccountInfo.FullName,
                Note: $scope.DetalRegistrationCar.Note,
                CarID: $scope.CarInfo.CarID,
                DriverID: $scope.CarInfo.DriverID,
            }
            $alert.showConfirmUpdateNewProfile('Xác nhận cập nhật chờ ban giám hiệu duyệt!', function () {
                $BookingCar.ManagerUpdateRegistrationCar(AdminVerifyRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Cập nhật thành công");
                            $scope.goToListRegisterCar();
                            break;
                    }

                });
            }); //end
        }
        // BGH duyệt   
        $scope.btnSchoolVerify = function () {
            var AdminVerifyRequestModel = {
                RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                Profile_Status: RegistrationStatus[6].RegistrationStatusType,
                UserNameUpdate: AccountInfo.FullName,
                CarID: $scope.CarInfo.CarID,
                DriverID: $scope.CarInfo.DriverID,
                Note: $scope.DetalRegistrationCar.Note,
            }
            
            $alert.showConfirmUpdateNewProfile('Xác nhận duyệt đơn cấp phát này!', function () {
                $BookingCar.ManagerUpdateRegistrationCar(AdminVerifyRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Duyệt thành công");
                            $scope.goToListRegisterCar();
                            break;
                    }

                });
            }); //end
        }
        // BGH Hủy không duyệt
        $scope.btnSchoolNotVerify = function () {
            var AdminVerifyRequestModel = {
                RegistrationCarID: GetListRegistrationCarRequestModel.RegistrationCarID,
                Profile_Status: RegistrationStatus[7].RegistrationStatusType,
                UserNameUpdate: AccountInfo.FullName,
                Note: $scope.DetalRegistrationCar.Note,
                CarID: $scope.CarInfo.CarID,
                DriverID: $scope.CarInfo.DriverID,
                Note: $scope.DetalRegistrationCar.Note,
            }
            $alert.showConfirmUpdateNewProfile('Xác nhận hủy không duyệt đơn cấp phát này!', function () {
                $BookingCar.ManagerUpdateRegistrationCar(AdminVerifyRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success("Hủy thành công");
                            $scope.goToListRegisterCar();
                            break;
                    }

                });
            }); //end
        }

    }]);

mainmodule.controller('PopupSearchCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', 'SearchCarRequestModel', '$modalInstance', '$alert',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, SearchCarRequestModel, $modalInstance, $alert) {

        $scope.init = function () {

            //$scope.SearchApproveRegistrationCar= {
            //    CarID: null,
            //    CarName: null,
            //    CarNo: null,
            //    CarStatus: null,
            //    CarImage: null,
            //    Expires: null,
            //    InsuranceExpires: null,
            //    DriverID: null,
            //    FullNameDriver: null,
            //}
            var ListRegistrationCarResponse = [];
            $scope.tableParams = $scope.tableParams = null;
            try {
                var SearchCarResponseModel = SearchCarRequestModel;
                $scope.SearchCarRequest = {
                    DateTimeFrom: SearchCarResponseModel.DateTimeFrom,
                    DateTimeTo: SearchCarResponseModel.DateTimeTo,
                    CarTypeNameRequest: SearchCarResponseModel.CarTypeNameRequest,
                    NumberPeople: SearchCarResponseModel.NumberPeople,
                }
                //Lấy danh sách xe 
                $BookingCar.SearchApproveRegistrationCar($scope.SearchCarRequest, function (response) {
                    var result = response.data.Data;
                    switch (response.data.ReturnCode) {
                        case 1:
                            if (result.length == 0) {
                                toastr.error("Không có dữ liệu.");
                            }
                            $scope.tableParams = new NgTableParams({}, { dataset: result });
                            break;

                    }
                });
            } catch (e) {
                $scope.ClosePopup();
            }
        }
        // chọn xe, cấp 

        $scope.btnApproveRegistrationCar = function (result) {
            var SearchApproveRegistrationCarResponse = {
                CarID: result.CarID,
                CarNo: result.CarNo,
                CarStatus: result.CarStatus,
                CarImage: result.CarImage,
                Expires: result.Expires,
                CarTypeName: result.CarTypeName,
                InsuranceExpires: result.InsuranceExpires,
                DriverID: result.DriverID,
                FullNameDriver: result.FullNameDriver,
            }
            // ok gọi api update thành công sẽ cập nhật lại lưới và hiển thị lại
            $alert.showConfirmUpdateNewProfile('Cấp xe cho đơn cấp phát!', function () {
                $modalInstance.close(SearchApproveRegistrationCarResponse);
            }); //end
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  