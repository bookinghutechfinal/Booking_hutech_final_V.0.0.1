//Anh.create 15/4/2019. Tài khoản có quyền quản lý đơn cấp phát xe. ->Phòng quản trị-> Ban BGH
mainmodule.controller('ManagerRegisterBookingCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $account) {

        var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
        var GetListRegistrationCarRequestModel = {
            ProfileStatus: null,
            RegistrationCarID: null,
            Unit_ID: null,
            DateTimeFrom: null,
            DateTimeTo: null,
        }
        $scope.init = function () {
            var ListRegistrationCarResponse = [];
            $scope.tableParams = $scope.tableParams = null;
            if ($rootScope.CheckCookies()) {
                // kiểm tra quyền thức khi thực hiên 
                if (($scope.checkPermission = $rootScope.showByPermission(901)) && // Quản trị - BGH
                    ($scope.checkPermission = $rootScope.showByPermission(900))) {

                    GetListRegistrationCarRequestModel.ProfileStatus = 2;
                    $scope.getListReRegisterCar(GetListRegistrationCarRequestModel);
                } else if (($scope.checkPermission = $rootScope.showByPermission(902)) &&
                    ($scope.checkPermission = $rootScope.showByPermission(900))) {
                    GetListRegistrationCarRequestModel.ProfileStatus = 6;
                    $scope.getListReRegisterCar(GetListRegistrationCarRequestModel);
                }
                else {
                    var audio = new Audio('../../audio/alert_message_audio.mp3');
                    audio.play();
                    audio.volume = 0.1;
                    toastr.error($rootScope.initMessage('NotPermission'));
                    return;
                }
            }
        }

        // Lấy danh sách đơn cấp phát
        $scope.getListReRegisterCar = function (request) {
            var GetListRegistrationCarRequestModel = {
                ProfileStatus: request.ProfileStatus,
                RegistrationCarID: request.RegistrationCarID,
                Unit_ID: request.Unit_ID,
                DateTimeFrom: request.DateTimeFrom,
                DateTimeTo: request.DateTimeTo
            }
            $BookingCar.ManagerGetListRegistrationCar(GetListRegistrationCarRequestModel, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        ListRegistrationCarResponse = res.data.Data.ListRegistrationCar;
                        try {
                            if (ListRegistrationCarResponse.length == 0 || ListRegistrationCarResponse == null) {

                            } else {
                                $scope.tableParams = new NgTableParams({}, { dataset: ListRegistrationCarResponse });
                            }
                        } catch (e) {
                            toastr.success("Không tìm thấy kết quả");
                            $scope.tableParams = new NgTableParams({}, { dataset: null });
                        }

                        break;
                }

            });
        }
        // tìm kiếm đơn cấp phát
        $scope.SearchGetListRegistrationCar = function (request) {
            if ($rootScope.CheckCookies()) {
                var SearchGetListRegistrationCarRequestModel = {
                    ProfileStatus: request.ProfileStatus,
                    RegistrationCarID: request.RegistrationCarID,
                    Unit_ID: request.Unit_ID,
                    DateTimeFrom: moment(request.DateTimeFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    DateTimeTo: moment(request.DateTimeTo + " 23:59:59", 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                }
                $scope.tableParams = new NgTableParams({}, { dataset: null });
                $BookingCar.SearchGetListRegistrationCar(SearchGetListRegistrationCarRequestModel, function (res) {
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
        $scope.btnRefresh = function () {
            $scope.Refresh();
            $scope.init();
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
        $scope.btnSearchRegisterCar = function () {
            if (!checkNull($scope.SearchRegisterCar.RegistrationCarID)) {

                $scope.SearchRegisterCar.ProfileStatus = null;
                $scope.resultSearch = null;
                angular.element('#DateFrom').val("");
                angular.element('#DateTo').val("");

                $scope.SearchGetListRegistrationCar($scope.SearchRegisterCar);
                $scope.isCheckDateFrom = false;
                $scope.isCheckDateTo = false;
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
            $scope.SearchGetListRegistrationCar($scope.SearchRegisterCar);
            $scope.resultSearch = "Từ ngày: " + FormatDateTimeByDBResponse($scope.SearchRegisterCar.DateTimeFrom) +
                " - Đến ngày: " + FormatDateTimeByDBResponse($scope.SearchRegisterCar.DateTimeTo
                );
        }
         
    }]);
 