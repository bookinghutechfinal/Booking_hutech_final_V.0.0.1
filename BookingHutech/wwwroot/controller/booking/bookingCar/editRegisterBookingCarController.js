mainmodule.controller('EditRegisterBookingCarController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', '$BookingCar', '$alert', '$account', '$BookingCar', 'EditRegisterRequestData',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, $BookingCar, $alert, $account, $BookingCar, EditRegisterRequestData) {
        var AccountInfo = $account.getAccountInfo().ObjAccountInfo
        $scope.Titile = "Đặt Xe";
        $scope.listCarTypeReq = [];
        $scope.isCheck = false;

        $scope.ClosePopup = function () {
            $modalInstance.close(true);
        }
        $scope.goToLogin = function () {
            $modalInstance.close();
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
            $rootScope.showError = true;
            return;
        };
        //

        // Account info
        $scope.AccountInfo = {
            FullName: AccountInfo.FullName,
            Account_ID: AccountInfo.Account_ID,
            Unit_ID: AccountInfo.Unit_ID,
            UnitName: AccountInfo.UnitName,
            AccountType: AccountInfo.AccountType,
            AccountTypeName: ConvertAccountTypeIDToName(AccountInfo.AccountType),

        }
        $scope.cartype = [];
        //$scope.toggle = function (item) {
        //    var idx = $scope.cartype.indexOf(item);
        //    if (idx > -1)
        //        $scope.cartype.splice(idx, 1);
        //    else
        //        $scope.cartype.push(item);
        //    $scope.CheckInputChange();
        //};

        //$scope.isExists = function (item) {
        //    return $scope.cartype.indexOf(item) > -1;
        //};

        // Load time 
        $scope.Times = Time;
        // Đăng ký đặt xe.   - Insert xuống DB.
        $scope.RegisterBKCar = {
            DateFrom: FormatDateTimeByDBResponse2(EditRegisterRequestData.DateTimeFrom),
            DateTo: FormatDateTimeByDBResponse2(EditRegisterRequestData.DateTimeTo),
            TimeFrom: moment(EditRegisterRequestData.DateTimeFrom, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
            TimeTo: moment(EditRegisterRequestData.DateTimeTo, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
            UnitRequest: EditRegisterRequestData.UnitName,
            Reason: EditRegisterRequestData.Reason,
            Leader: EditRegisterRequestData.Leader,
            EmailLeader: EditRegisterRequestData.EmailLeader,
            NumberPhoneLeader: parseInt(EditRegisterRequestData.NumberPhoneLeader),
            NumberPeople: parseInt(EditRegisterRequestData.NumberPeople),
            Note: null, // loại xe được yêu cầu
            RouteTo: EditRegisterRequestData.RouteTo, //Lộ trình đi 
            RouteBack: EditRegisterRequestData.RouteBack, //Lộ trình vế 
            PlanDistanceTo: parseInt(EditRegisterRequestData.PlanDistanceTo), //Khoản cách dự định đến 
            PlanDistanceBack: parseInt(EditRegisterRequestData.PlanDistanceBack), //Khoản cách dự định đến 
            DateTimeFrom: null,
            DateTimeTo: null,
            Profile_Status: null,
            CarTypeNameRequest: EditRegisterRequestData.CarTypeNameRequest,
            Account_ID: null,
            Unit_ID: null,
            RegistrationCarID: EditRegisterRequestData.RegistrationCarID

        }


        if ($rootScope.CheckCookies()) {
            // init 
            if (!checkNull(EditRegisterRequestData)) {
                $modalInstance.close();
            }
            $scope.listCartype = [];
            var CarType = {
                Checked: null,

            }
            $scope.getListCarType = function () {
                $BookingCar.getListCarType({}, function (res) {
                    if (res.data.ReturnCode === 1) {
                        $scope.listCartype = res.data.Data;
                        $scope.listCarTypeReq = angular.copy($scope.listCartype);
                    }

                });
            }
            $scope.getListCarType();
            angular.element('#DateToEdit').val(FormatDateTimeByDBResponse2(EditRegisterRequestData.DateTimeFrom));
            angular.element('#DateToEdit').val(FormatDateTimeByDBResponse2(EditRegisterRequestData.DateTimeTo));
        } else {
            $modalInstance.close(false);
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
            if (checkNull(angular.element('#DateFromEdit').val())) {
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
            if (checkNull(angular.element('#DateToEdit').val())) {
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
            if (!checkNull(angular.element('#DateFromEdit').val()) &&
                !checkNull($scope.RegisterBKCar.TimeFrom) &&
                !checkNull(angular.element('#DateToEdit').val()) &&
                !checkNull($scope.RegisterBKCar.TimeTo)
            ) {

                $scope.RegisterBKCar.DateTimeFrom = angular.element('#DateFromEdit').val() + " " + $scope.RegisterBKCar.TimeFrom;
                $scope.RegisterBKCar.DateTimeTo = angular.element('#DateToEdit').val() + " " + $scope.RegisterBKCar.TimeTo;
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
            var count = 0;
            for (var i = 0; i < $scope.listCarTypeReq.length; i++) {
                if ($scope.listCarTypeReq[i].isCheck) {
                    count++;
                }
            }
            if (count == 0) {
                $scope.isCheckCarTypeNote = true;
                $scope.isButtonRegister = true;
                return;
            } else {
                $scope.isCheckCarTypeNote = false;
                $scope.isButtonRegister = false;
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

        $scope.ParseCarType = function (item) {
            $scope.CheckInputChange();
            $scope.ListUserChooseCarType = angular.fromJson($scope.RegisterBKCar.CarTypeNameRequest);
            for (var i = 0; i < $scope.ListUserChooseCarType.length; i++) {
                if ($scope.ListUserChooseCarType[i].CarTypeID === item.CarTypeID) {
                    item.isCheck = true;
                    return;
                }
            }
            item.isCheck = false;
            return;
        }
        // button xác nhận đăng ký. 
        $scope.btnEditRegisterBKCar = function () {
            if ($rootScope.CheckCookies()) {
                // lấy loại xe y/c
                var cartypeRequest = []; 
                for (var i = 0; i < $scope.listCarTypeReq.length; i++) {
                    if ($scope.listCarTypeReq[i].isCheck) {
                        var CarType = {
                            CarTypeID: null,
                            CarTypeName: null
                        }
                        var CarType = {
                            CarTypeID: $scope.listCarTypeReq[i].CarTypeID,
                            CarTypeName: $scope.listCarTypeReq[i].CarTypeName
                        }
                        cartypeRequest.push(CarType);
                    }
                }
                var cartyperequestString = angular.toJson(cartypeRequest);
                $scope.RegisterBKCar.DateTimeFrom = FormatDateTimeToDBRequest($scope.RegisterBKCar.DateTimeFrom);
                $scope.RegisterBKCar.DateTimeTo = FormatDateTimeToDBRequest($scope.RegisterBKCar.DateTimeTo);
                // còn nữa
                $scope.RegisterBKCar.CarTypeNameRequest = cartyperequestString;
                $scope.RegisterBKCar.Account_ID = $scope.AccountInfo.Account_ID;
                $scope.RegisterBKCar.Unit_ID = $scope.AccountInfo.Unit_ID;
                $scope.RegisterBKCar.Profile_Status = ReturnAccountType($scope.AccountInfo.AccountType);
                $alert.showConfirmUpdateNewProfile('Chỉnh sửa đơn cấp phát xe công tác!', function () {
                    $BookingCar.EditRegistrationCar($scope.RegisterBKCar, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                //$scope.ClosePopup(); 
                                var audio = new Audio('../../audio/alert_message_audio.mp3');
                                audio.play();
                                audio.volume = 0.1;
                                $scope.isShowRegisterSuccess = true;
                                toastr.success("Chỉnh sửa thành công");
                                break;
                        }

                    });

                }); //end
            } else {
                $modalInstance.close(false);
            }

        }
    }]);

//String loạixe = "4 chổ,9 chổ,16 chổ,";
//Array[0] = "4 chổ";
//Array[1] = "9 chổ";
//Array[2] = "16 chổ"; 