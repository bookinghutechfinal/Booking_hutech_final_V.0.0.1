mainmodule.controller('popupDetailCarController', ['$scope', '$state', '$rootScope', '$cookies', 'toastr', '$BookingCar', '$modalInstance', 'CarInfoRequest', '$alert', '$account',
    function ($scope, $state, $rootScope, $cookies, toastr, $BookingCar, $modalInstance, CarInfoRequest, $alert, $account) {

        try {
            var AccountInfo = $account.getAccountInfo(); // test Lấy cookies người dùng. 
            //var testCookies = AccountInfo.ObjAccountInfo.Account_ID;

            $scope.CarInfo = {
                CarImage: CarInfoRequest.CarImage,
                CarName: CarInfoRequest.CarName,
                CarNo: CarInfoRequest.CarNo,
                CarTypeName: CarInfoRequest.CarTypeName,
                CarTypeID: CarInfoRequest.CarTypeID,
                Expires: CarInfoRequest.Expires,
                InsuranceExpires: CarInfoRequest.InsuranceExpires,
                FullNameUpdate: AccountInfo.ObjAccountInfo.FullName,
                CarID: CarInfoRequest.CarID,
                CarStatus: CarInfoRequest.CarStatus,
                LastModifiedDate: CarInfoRequest.LastModifiedDate,
                CarImageNew: null
            };
            // img 
            $scope.ImageModel = {
                CHAN_DUNG: {
                    ImageName: 1,
                    ImageData: {
                        compressed: {
                            dataURL: null
                        }
                    },
                },
            }
            //$scope.CarInfo = CarInfoRequest;
            //$scope.listCarType = [];

            $scope.getCarType = function () {
                $BookingCar.getListCarType({}, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            $scope.listCarType = res.data.Data;
                            angular.element('#myDate1').val(FormatDateTimeByDBResponse2(CarInfoRequest.Expires));
                            angular.element('#myDate2').val(FormatDateTimeByDBResponse2(CarInfoRequest.InsuranceExpires));
                            break;
                    }
                });
            }
            // lấy thông tin loại xe.
            $scope.getCarType();

            //Hàm đổi trạng thái xe
            $scope.updateCarStatus = function (request) {
                var updateCarStatusRequestModel = {
                    CarID: CarInfoRequest.CarID,
                    CarStatus: request
                }
                $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn đổi tình trạng xe này?'), function () {
                    $BookingCar.updateCarStatus(updateCarStatusRequestModel, function (response) {
                        if (response.data.ReturnCode === 1) {
                            // $scope.getCarInfo();
                            toastr.success("Bạn đã đổi thành công.");
                            $scope.CarInfo.CarStatus = updateCarStatusRequestModel.CarStatus;
                        }
                    });
                });
            }

            $scope.btndisabled = true;
            $scope.isShowRegisterSuccess = false;
            $scope.ischeckImgNew = false;
            // Edit car, 
            $scope.TestInputChange = function (Request) {
                $scope.isShowRegisterSuccess = false;
                // check data
                if (checkNull(Request.CarName)) {
                    $scope.btndisabled = true;
                    return;
                }
                if (checkNull(Request.CarNo)) {
                    $scope.btndisabled = true;
                    return;
                }
                if (checkNull(angular.element('#myDate1').val(FormatDateTimeByDBResponse2(CarInfoRequest.Expires)))) {
                    $scope.btndisabled = true;
                    return;
                }
                if (checkNull(angular.element('#myDate2').val(FormatDateTimeByDBResponse2(CarInfoRequest.InsuranceExpires)))) {
                    $scope.btndisabled = true;
                    return;
                }
                if (checkNull(Request.CarTypeID)) {
                    $scope.btndisabled = true;
                    return;
                }
                else {
                    $scope.btndisabled = false;
                }
                //  kiểm tra chọn hình mới
                if ($scope.ischeckImgNew) {
                    if ($scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL == "" || $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL == null) {
                        $scope.btndisabled = true;
                        return;
                    }
                }

            }

            $scope.TestInputChange($scope.CarInfo);
            // Update Car. 
            $scope.updateCarInfo = function () {
                $scope.CarInfo.Expires = FormatDateTimeToDBRequest(angular.element('#myDate1').val());
                $scope.CarInfo.InsuranceExpires = FormatDateTimeToDBRequest(angular.element('#myDate2').val());
                $scope.CarInfo.CarTypeID = angular.element('#carType').val();
                //if (checkNull($scope.CarInfo.CarName) || checkNull($scope.CarInfo.CarNo) || checkNull($scope.CarInfo.CarTypeID) || checkNull($scope.CarInfo.Expires) || checkNull($scope.CarInfo.InsuranceExpires)) {
                //    $scope.ErrorInput = true;
                //    return;
                //}

                // Kiểm tra chọn hình cũ hay hình mới. 
                if ($scope.ischeckImgNew == true && $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL !== "") { //$scope.ischeckImgNew == true && 
                    alert("Hình mới");
                    // chọn  up hình mới, nhưng chưa chọn hình
                    // $scope.btndisabled = true;
                    if ($scope.ischeckImgNew == false || $scope.ischeckImgNew == true && $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL == null) {
                        $scope.btndisabled = true;

                    } else {
                        alert("hình mới ok");
                        $scope.TestInputChange($scope.CarInfo);
                        $scope.CarInfo.CarImageNew = $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL;
                    }

                } else {
                    $scope.TestInputChange($scope.CarInfo);
                    $scope.ischeckImgNew = false;
                    alert("lấy lại Hình cũ");
                }
                // insert 
                if ($scope.btndisabled == false) {
                    $alert.showConfirmUpdateCarInfo($rootScope.initMessage('Xác nhận cập nhật thông tin xe!'), function () {
                        $BookingCar.updateCarInfo($scope.CarInfo, function (res) {
                            switch (res.data.ReturnCode) {
                                case 1:
                                    toastr.success('Cập nhật thông tin xe thành công.');
                                    // $modalInstance.close();
                                    $scope.isShowRegisterSuccess = true;
                                    break;
                            }
                        });
                    });
                }

            }

            // xóa hình mới
            $scope.removeImage = function () {
                $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL = "";
                $scope.ischeckImgNew = false;
                $scope.btndisabled = false;
                $scope.CarInfo.CarImageNew = null;
            }
            // hủy chọn hình mới
            $scope.removeImageNew = function () {
                $scope.ischeckImgNew = false;
                $scope.btndisabled = false;
                $scope.CarInfo.CarImageNew = null;
            }
            // chọn chức năng đổi hình
            $scope.upLoadIMGNew = function () {
                $scope.ischeckImgNew = true;
                $scope.btndisabled = false;
                $scope.CarInfo.CarImageNew = null;
                //$scope.TestInputChange($scope.EditProfiAccount);
            }
            $scope.ClosePopup = function () {
                $modalInstance.close();
            }

            // end try
        } catch (e) {
            $cookies.remove('AccountInfo');
            $cookies.remove("AccountInfoCheckPermissions");
            $cookies.remove("myReload");
            $modalInstance.close();
            toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
            $state.go("login");
        }
    }]);

