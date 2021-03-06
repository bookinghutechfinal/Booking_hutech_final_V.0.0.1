﻿
//Anh.create 15/4/2019. Tài khoản có quyền quản lý đơn cấp phát xe. ->Khoa/Viện/ Thư ký khoa
mainmodule.controller('UnitRegisterBookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $account) {

        // kiểm tra sesstion 
        var AccountInfo = $account.getAccountInfo();
       
        $scope.init = function () {
            var GetListRegistrationCarRequestModel = {
                ProfileStatus: null,
                RegistrationCarID: null,
                Unit_ID: null
            }
            var ListRegistrationCarResponse = [];
            $scope.tableParams = $scope.tableParams = null;
            // kiểm tra Cookies và quyền thực hiện
            if ($rootScope.CheckCookies() && $rootScope.CheckPermission(904)) {  
                GetListRegistrationCarRequestModel.Unit_ID = AccountInfo.Unit_ID;
                $scope.UnitGetListRegister(GetListRegistrationCarRequestModel);
            }
        }

        // danh sách đơn cấp phát
        $scope.UnitGetListRegister = function (request) {
            if ($rootScope.CheckCookies()) {
                GetListRegistrationCarRequestModel = {
                    ProfileStatus: request.ProfileStatus,
                    RegistrationCarID: request.RegistrationCarID,
                    Unit_ID: request.Unit_ID
                }
                $BookingCar.UnitGetListRegistrationCar(GetListRegistrationCarRequestModel, function (res) {
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
        }

        // tìm kiếm đơn cấp phát
        $scope.UnitSearchGetListRegistrationCar = function (request) {
            if ($rootScope.CheckCookies()) {
                var SearchGetListRegistrationCarRequestModel = {
                    ProfileStatus: request.ProfileStatus,
                    RegistrationCarID: request.RegistrationCarID,
                    Unit_ID: AccountInfo.Unit_ID,
                    DateTimeFrom: moment(request.DateTimeFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    DateTimeTo: moment(request.DateTimeTo + " 23:59:59", 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                }
                $scope.tableParams = new NgTableParams({}, { dataset: null });
                $BookingCar.UnitSearchGetListRegistrationCar(SearchGetListRegistrationCarRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            ListRegistrationCarResponse = res.data.Data.ListRegistrationCar;
                            try {
                                if (ListRegistrationCarResponse.length == 0 || ListRegistrationCarResponse == null) {
                                    toastr.success("Không tìm thấy kết quả");
                                } else {
                                    $scope.tableParams = new NgTableParams({}, { dataset: ListRegistrationCarResponse });

                                }
                            } catch (e) {
                                toastr.success("Không tìm thấy kết quả");
                                //$scope.tableParams = new NgTableParams({}, { dataset: null });
                            }
                            break;
                    }
                });
            }
        }

        //   // kiểm tra quyền thức khi thực hiên 
        //$scope.checkPermissionInit = function () { 
        //    if ( () && // khoa/viên, thu ky
        //        ($rootScope.showByPermission(907))) {
        //        return true; 
        //    }
        //    else {
        //        toastr.error("Xin lỗi! Bạn không có quyền thực hiện chức năng này");
        //        return false; 
        //    }
        //}

        $scope.init();

        $scope.Refresh = function () {
            $scope.SearchRegisterCar = {
                ProfileStatus: null,
                RegistrationCarID: null,
                Unit_ID: null,
                DateTimeFrom: null,
                RegistrationCarID: null,
            }

            $scope.resultSearch = null;
            angular.element('#DateFrom').val("");
            angular.element('#DateTo').val("");
            $scope.init();
        }

        //Button refresh
        $scope.btnRefresh = function () {
            if ($rootScope.CheckCookies()) {
                $scope.Refresh();
            } 
        }
        // Tìm kiếm 
        $scope.SearchRegisterCar = {
            ProfileStatus: null,
            RegistrationCarID: null,
            Unit_ID: null,
            DateTimeFrom: null,
            RegistrationCarID: null,
        }
        $scope.isCheckProfile_Status = false;
        $scope.isCheckDateFrom = false;
        $scope.isCheckDateTo = false;
        $scope.resultSearch = null;
        // buttom tìm kiếm
        $scope.btnUnitSearchRegisterCar = function () {
            if ($rootScope.CheckCookies()) {
                if (!checkNull($scope.SearchRegisterCar.RegistrationCarID)) {
                    $scope.SearchRegisterCar.ProfileStatus = null;
                    $scope.resultSearch = null;
                    angular.element('#DateFrom').val("");
                    angular.element('#DateTo').val("");

                    $scope.UnitSearchGetListRegistrationCar($scope.SearchRegisterCar);
                    $scope.isCheckDateFrom = false;
                    $scope.isCheckDateTo = false;
                    $scope.isCheckProfile_Status = false;
                    $scope.resultSearch = "Mã đơn " + $scope.SearchRegisterCar.RegistrationCarID;
                    return;
                }
                if (checkNull(angular.element('#DateFrom').val())) {
                    $scope.resultSearch = null;
                    $scope.isCheckDateFrom = true;
                    return;
                } else {
                    $scope.isCheckDateFrom = false;
                }
                if (checkNull(angular.element('#DateTo').val())) {
                    $scope.resultSearch = null;
                    $scope.isCheckDateTo = true;
                    return;
                } else {
                    $scope.isCheckDateTo = false;
                }
                if (checkNull($scope.SearchRegisterCar.ProfileStatus)) {
                    $scope.isCheckProfile_Status = true;
                    $scope.resultSearch = null;
                    return;
                }
                // if kiểm tra từ ngày và đến ngày 
                if (!checkNull(angular.element('#DateFrom').val()) &&
                    !checkNull(angular.element('#DateTo').val())
                ) {

                    $scope.SearchRegisterCar.DateTimeFrom = angular.element('#DateFrom').val();
                    $scope.SearchRegisterCar.DateTimeTo = angular.element('#DateTo').val() + " 23:59:59";
                    if (FormatDateTimeInputToNumber2($scope.SearchRegisterCar.DateTimeFrom) > FormatDateTimeInputToNumber2($scope.SearchRegisterCar.DateTimeTo)) {
                        toastr.error("Không hợp lệ! Từ ngày không được lớn  hơn Đến ngày");
                        return;
                    }
                }
                $scope.SearchRegisterCar.RegistrationCarID = null;
                $scope.UnitSearchGetListRegistrationCar($scope.SearchRegisterCar);
                $scope.resultSearch = "Từ ngày: " + FormatDateTimeByDBResponse($scope.SearchRegisterCar.DateTimeFrom) +
                    " - Đến ngày: " + FormatDateTimeByDBResponse($scope.SearchRegisterCar.DateTimeTo
                    );
            }
        }

    }]);
