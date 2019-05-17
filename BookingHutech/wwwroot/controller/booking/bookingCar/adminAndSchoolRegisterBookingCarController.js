﻿mainmodule.controller('AdminAndSchoolRegisterBookingCarController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$modalInstance', '$BookingCar', '$alert', '$account', '$BookingCar','$modal',
    function ($scope, $state, $rootScope, $cookies, toastr, $modalInstance, $BookingCar, $alert, $account, $BookingCar, $modal) {

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
            $rootScope.showError = true;
            return;
        };


        try {
            var AccountInfo = $account.getAccountInfo()
            var testCookies = AccountInfo.Account_ID;
            $scope.listCartype = [];
            var CarType = {
                CarTypeID: null,
                CarTypeName: null
            }
            $scope.getListCarType = function () {
                $BookingCar.getListCarType({}, function (res) {
                    if (res.data.ReturnCode === 1) {
                        // $scope.listCartype = res.data.Data;   
                        for (var i = 0; i < res.data.Data.length; i++) {
                            var CarType = {
                                CarTypeID: null,
                                CarTypeName: null
                            }
                            var CarType = {
                                CarTypeID: res.data.Data[i].CarTypeID,
                                CarTypeName: res.data.Data[i].CarTypeName
                            }
                            $scope.listCartype.push(CarType);

                        }
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
            AccountType: AccountInfo.AccountType,
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
            $scope.isShowButtonSearchCar = false;// show buton tìm xe
            $scope.isShowMessChonseCar = false; 
            $scope.isCarInfo = false; 
        }
        $scope.initShowMessCheck();
        // kiểm tra input dự liệu cho màn hình đăng ký. 
        $scope.CheckInputChange = function () {
            $scope.isShowRegisterSuccess = false;
            // ngày giờ đi
            if (checkNull(angular.element('#DateFromad').val())) {
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
            if (checkNull(angular.element('#DateToad').val())) {
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
            if (!checkNull(angular.element('#DateFromad').val()) &&
                !checkNull($scope.RegisterBKCar.TimeFrom) &&
                !checkNull(angular.element('#DateToad').val()) &&
                !checkNull($scope.RegisterBKCar.TimeTo)
            ) {

                $scope.RegisterBKCar.DateTimeFrom = angular.element('#DateFromad').val() + " " + $scope.RegisterBKCar.TimeFrom;
                $scope.RegisterBKCar.DateTimeTo = angular.element('#DateToad').val() + " " + $scope.RegisterBKCar.TimeTo;
                //if (CheckDateTimeMaxvsDateToDay($scope.RegisterBKCar.DateTimeFrom)) {
                //    toastr.error("Ngày giờ đi không  được nhỏ hơn hoặc bằng ngày giờ hiện tại!"); 
                //}

                if (CompareDateTimeFromTo($scope.RegisterBKCar.DateTimeFrom, $scope.RegisterBKCar.DateTimeTo)) {
                    $scope.isShowMessInputErrorDateTime = true;
                    $scope.isButtonRegister = true;
                    $scope.isShowButtonSearchCar = false;
                    $scope.CarInfo.CarImage = ""; // thay đổi ngày  giờ đi thì phải chọn lại xe. 
                    $scope.isCarInfo = false; 
                    return;
                } else {
                    $scope.isShowMessInputErrorDateTime = false; 
                    $scope.isShowButtonSearchCar = true;
                    $scope.isShowMessChonseCar = true;
                    // chọn lại xe 
                    
                }
            }
            // chọn xe 
            if (checkNull($scope.CarInfo.CarImage)) {
                $scope.isShowMessChonseCar = true;
                $scope.isCarInfo = false; 
                return;
            } else {
                $scope.isShowMessChonseCar = false;
                $scope.isCarInfo = true;
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
        // mở tìm xe trống
        $scope.OpenPopupSearchCar = function () {
            if ($rootScope.CheckCookies() && $rootScope.CheckPermission(903)) {
                var SearchCarRequest = {
                    DateTimeFrom: $scope.RegisterBKCar.DateTimeFrom,
                    DateTimeTo: $scope.RegisterBKCar.DateTimeTo,
                    CarTypeNameRequest: null,
                    NumberPeople: null,
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
                    $scope.CheckInputChange(); 
                    $scope.CheckCarInfoRequest();
                });
            }

        }

        // button xác nhận đăng ký. 
        $scope.btnRegisterBKCar = function () {
            try {
                var AccountInfo = $account.getAccountInfo();
                // lấy loại xe y/c
                var cartyperequest = angular.toJson($scope.cartype);  
                $scope.RegisterBKCar.DateTimeFrom = FormatDateTimeToDBRequest($scope.RegisterBKCar.DateTimeFrom);
                $scope.RegisterBKCar.DateTimeTo = FormatDateTimeToDBRequest($scope.RegisterBKCar.DateTimeTo); 
                $scope.RegisterBKCar.CarTypeNameRequest = cartyperequest;
                $scope.RegisterBKCar.Account_ID = $scope.AccountInfo.Account_ID;
                $scope.RegisterBKCar.Unit_ID = $scope.AccountInfo.Unit_ID;
                $scope.RegisterBKCar.Profile_Status = ReturnAccountType($scope.AccountInfo.AccountType);

                $alert.showConfirmUpdateNewProfile('Đăng ký cấp phát xe công tác!', function () {
                    $BookingCar.CreateNewRegistrationCar($scope.RegisterBKCar, function (res) {
                        switch (res.data.ReturnCode) {
                            case 1:
                                //$scope.ClosePopup(); 
                                var audio = new Audio('../../audio/alert_message_audio.mp3');
                                audio.play();
                                audio.volume = 0.1; 
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

            // mở tìm xe trống
            $scope.OpenPopupSearchCar = function () {
                if ($rootScope.CheckCookies() && $rootScope.CheckPermission(903)) {
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

            }
        }
    }]);    