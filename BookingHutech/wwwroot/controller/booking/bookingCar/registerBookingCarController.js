mainmodule.controller('RegisterBookingCarController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', '$BookingCar', '$alert', '$account', '$BookingCar',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, $BookingCar, $alert, $account, $BookingCar) {

        $scope.Titile = "Đặt Xe";
        $scope.ClosePopup = function () {
            $modalInstance.close();
        }
        $scope.goToLogin = function () {
            $modalInstance.close(); 
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
            $state.go("login");
            return;
        };
       

        try { 
            var AccountInfo = $account.getAccountInfo().ObjAccountInfo;
            $scope.listCartype = [];
            $scope.getListCarType = function () { 
                $BookingCar.getListCarType({}, function (res) { 
                    if (res.data.ReturnCode === 1) {
                        $scope.listCartype = res.data.Data;   
                    }

                });
            }
            $scope.getListCarType(); 
        }
        catch (err) {
            $scope.goToLogin();
        }
        // Account info
        $scope.AccountInfo = {
            FullName: AccountInfo.FullName,
            Account_ID: AccountInfo.Account_ID,
            Unit_ID: AccountInfo.Unit_ID,
            UnitName: AccountInfo.UnitName,
            AccountType:AccountInfo.AccountType,
            AccountTypeName: ConvertAccountTypeIDToName(AccountInfo.AccountType),

        } 
        $scope.cartype = [];
        $scope.toggle = function (item) {
            var idx = $scope.cartype.indexOf(item);
            if (idx > -1)
                $scope.cartype.splice(idx, 1);
            else
                $scope.cartype.push(item);
            $scope.CheckInputChange();
        };
        $scope.isExists = function (item) {
            return $scope.cartype.indexOf(item) > -1;
        };

        // Load time 
        $scope.Times = Time;
        // Đăng ký đặt xe.   - Insert xuống DB.
        $scope.RegisterBKCar = {
            DateFrom: null,
            TimeFrom: null,
            DateTo: null,
            TimeTo: null,
            UnitRequest: $scope.AccountInfo.UnitName,
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
            CarTypeNameRequest: null,
            Account_ID: null,
            Unit_ID: null

        }
        // Show messager
        $scope.initShowMessCheck = function () {
            $scope.isShowMessInputErrorDateTime = false;
            $scope.isCheckDateFrom = false;
            $scope.isCheckTimeForm = false;
            $scope.isCheckDateTo = false;
            $scope.isCheckTimeTo = false;
            $scope.isCheckUnitRequest = false;
            $scope.isCheckReason = false;
            $scope.isCheckLeader = false;
            $scope.isCheckNumberPhoneLeader = false;
            $scope.isCheckEmailLeader = false;
            $scope.isCheckNumberPeople = false;
            $scope.isCheckCarTypeNote = false;
            $scope.isCheckRouteTo = false;
            $scope.isCheckPlanDistanceTo = false;
            $scope.isCheckRouteBack = false;
            $scope.isCheckPlanDistanceBack = false;
            $scope.isButtonRegister = true;
            $scope.isShowRegisterSuccess = false; 
        }
        $scope.initShowMessCheck();
        // kiểm tra input dự liệu cho màn hình đăng ký. 
        $scope.CheckInputChange = function () {
            $scope.isShowRegisterSuccess = false;
            // ngày giờ đi
            if (checkNull(angular.element('#DateFrom').val())) {
                $scope.isCheckDateFrom = true;
                $scope.isButtonRegister = true;
                return;
            } else {
                $scope.isCheckDateFrom = false;
            }
            if (checkNull($scope.RegisterBKCar.TimeFrom)) {
                $scope.isCheckTimeForm = true;
                $scope.isButtonRegister = true;
                return;
            }
            // ngày giờ về
            if (checkNull(angular.element('#DateTo').val())) {
                $scope.isCheckDateTo = true;
                $scope.isButtonRegister = true;
                return;
            } else {
                $scope.isCheckDateTo = false;
            }
            if (checkNull($scope.RegisterBKCar.TimeTo)) {
                $scope.isCheckTimeTo = true;
                $scope.isButtonRegister = true;
                return;
            }
            // if kiểm tra ngày giờ đi và về. 
            if (!checkNull(angular.element('#DateFrom').val()) &&
                !checkNull($scope.RegisterBKCar.TimeFrom) &&
                !checkNull(angular.element('#DateTo').val()) &&
                !checkNull($scope.RegisterBKCar.TimeTo)
            ) {

                $scope.RegisterBKCar.DateTimeFrom = angular.element('#DateFrom').val() + " " + $scope.RegisterBKCar.TimeFrom;
                $scope.RegisterBKCar.DateTimeTo = angular.element('#DateTo').val() + " " + $scope.RegisterBKCar.TimeTo;
                //if (CheckDateTimeMaxvsDateToDay($scope.RegisterBKCar.DateTimeFrom)) {
                //    toastr.error("Ngày giờ đi không  được nhỏ hơn hoặc bằng ngày giờ hiện tại!"); 
                //}

                if (CompareDateTimeFromTo($scope.RegisterBKCar.DateTimeFrom, $scope.RegisterBKCar.DateTimeTo)) {
                    $scope.isShowMessInputErrorDateTime = true;
                    $scope.isButtonRegister = true;

                    return;
                } else {
                    $scope.isShowMessInputErrorDateTime = false;
                }
            }
            // đơn vị yc
            if (checkNull($scope.RegisterBKCar.UnitRequest)) {
                $scope.isCheckUnitRequest = true;
                $scope.isButtonRegister = true;
                return;
            }
            // lý do
            if (checkNull($scope.RegisterBKCar.Reason)) {
                $scope.ischeckReason = true;
                $scope.isButtonRegister = true;
                return;
            }
            // trưởng đoàn
            if (checkNull($scope.RegisterBKCar.Leader)) {
                $scope.isCheckLeader = true;
                $scope.isButtonRegister = true;
                return;
            }
            // số điện thoại
            if (checkNull($scope.RegisterBKCar.NumberPhoneLeader)) {
                $scope.isCheckNumberPhoneLeader = true;
                $scope.isButtonRegister = true;
                return;
            }
            // email
            if (!checkEmailInput($scope.RegisterBKCar.EmailLeader)) { // flase: no; true: ok
                $scope.isCheckEmailLeader = true;
                $scope.isButtonRegister = true;
                return;
            } else if ($scope.isCheckEmailLeader) {
                $scope.isCheckEmailLeader = false;
                $scope.isButtonRegister = true;
                return;
            }
            // số người tham gia
            if (checkNull($scope.RegisterBKCar.NumberPeople) || $scope.RegisterBKCar.NumberPeople <= 0) {
                $scope.isCheckNumberPeople = true;
                $scope.isButtonRegister = true;
                return;
            } else if ($scope.isCheckNumberPeople) {
                $scope.isCheckNumberPeople = false;
                $scope.isButtonRegister = true;
            }
            // laoị xe
            if ($scope.cartype.length < 1) {
                $scope.isCheckCarTypeNote = true;
                $scope.isButtonRegister = true;
                return;
            }
            // lộ trình đi
            if (checkNull($scope.RegisterBKCar.RouteTo) || !ChechLength($scope.RegisterBKCar.RouteTo)) {
                $scope.isCheckRouteTo = true;
                $scope.isButtonRegister = true;
                return;
            } else if ($scope.isCheckRouteTo) {
                $scope.isCheckRouteTo = false;

            }
            // khoản cách đi dự kiến
            if (checkNull($scope.RegisterBKCar.PlanDistanceTo) || $scope.RegisterBKCar.PlanDistanceTo <= 0) {
                $scope.isCheckPlanDistanceTo = true;
                $scope.isButtonRegister = true;
                return;
            } else if ($scope.isCheckPlanDistanceTo) {
                $scope.isCheckPlanDistanceTo = false;
                $scope.isButtonRegister = true;
            }

            // lộ trình về
            if (checkNull($scope.RegisterBKCar.RouteBack) || !ChechLength($scope.RegisterBKCar.RouteBack)) {
                $scope.isCheckRouteBack = true;
                $scope.isButtonRegister = true;
                return;
            }
            else if ($scope.isCheckRouteBack) {
                $scope.isCheckRouteBack = false;
            }
            // khoản cách về dự kiến
            if (checkNull($scope.RegisterBKCar.PlanDistanceBack) || $scope.RegisterBKCar.PlanDistanceBack <= 0) {
                $scope.isCheckPlanDistanceBack = true;
                $scope.isButtonRegister = true;
                return;
            } else if ($scope.isCheckPlanDistanceBack) {
                $scope.isCheckPlanDistanceBack = false;
                $scope.isButtonRegister = true;
            }
            // ok insert
            $scope.isButtonRegister = false;
            //  alert("ok gọi hàm insert");
        }

        // button xác nhận đăng ký. 
        $scope.btnRegisterBKCar = function () {
            try {
                var AccountInfo = $account.getAccountInfo().ObjAccountInfo;
                // lấy loại xe y/c
                var cartyperequest = "";
                for (var i = 0; i < $scope.cartype.length; i++) {
                    cartyperequest += $scope.cartype[i] + ",";
                }

                $scope.RegisterBKCar.DateTimeFrom = FormatDateTimeToDBRequest($scope.RegisterBKCar.DateTimeFrom);
                $scope.RegisterBKCar.DateTimeTo = FormatDateTimeToDBRequest($scope.RegisterBKCar.DateTimeTo);
                // còn nữa
                $scope.RegisterBKCar.CarTypeNameRequest = cartyperequest;
                $scope.RegisterBKCar.Account_ID = $scope.AccountInfo.Account_ID;
                $scope.RegisterBKCar.Unit_ID = $scope.AccountInfo.Unit_ID;
                $scope.RegisterBKCar.Profile_Status = ReturnAccountType($scope.AccountInfo.AccountType);
                $alert.showConfirmUpdateNewProfile('Đăng ký cấp phát xe công tác!', function () {
                    $BookingCar.CreateNewRegistrationCar($scope.RegisterBKCar, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                //$scope.ClosePopup(); 
                                $scope.isShowRegisterSuccess = true;
                                toastr.success("Đăng ký thành công");
                                break;
                        }

                    });

                }); //end
            }
            catch (err) {
                $scope.goToLogin();
            }

        }
    }]);    