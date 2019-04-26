mainmodule.controller('AddNewCarController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance', '$account','$alert',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance, $account, $alert) {
        try {
            var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

            $scope.init = function () {
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
                $scope.CarInfo = {
                    CarID: null,
                    CarName: $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL,
                    CarNo: null,
                    CarTypeID: null,
                    CarStatus: null,
                    CarImage: null,
                    Expires: null,
                    InsuranceExpires: null,
                    FullNameUpdate: null
                }
                $scope.getCarType();
            }

            $scope.getCarType = function () {
                $BookingCar.getListCarType({}, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            $scope.listCarType = res.data.Data;
                            break;
                    }
                });
            }

            $scope.init();

            $scope.ClosePopup = function () {
                $modalInstance.close();
            }

            $scope.btndisabled = true;
            $scope.isCheckimgUrl = false;
            $scope.TestInputChange = function (Request) {
                if (checkNull(Request.CarName)) {
                    $scope.btndisabled = true;
                    return;
                } else
                    if (checkNull(Request.CarTypeID)) {
                        $scope.btndisabled = true;
                        return;
                    } else
                        if (angular.element('#myDate1').val() == 'Invalid date') {
                            $scope.btndisabled = true;
                            return;
                        } else
                            if (angular.element('#myDate2').val() == 'Invalid date') {
                                $scope.btndisabled = true;
                                return;
                            } else
                                if (checkNull(Request.CarNo)) {
                                    $scope.btndisabled = true;
                                    return;
                                } else if (checkNull($scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL)) {
                                    $scope.isCheckimgUrl = true;
                                    $scope.btndisabled = false;
                                }
                                    else {
                                    $scope.btndisabled = false;
                                }
            }
            

            // add new car 
            $scope.addNewCar = function () {
            try {
                var AccountInfo = $account.getAccountInfo(); 
                // code 
                if ($scope.CheckUploatImg($scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL)) { 
                    $scope.CarInfo.FullNameUpdate = AccountInfo.ObjAccountInfo.FullName;
                    $scope.CarInfo.CarImage = $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL;
                    $scope.CarInfo.Expires = moment(angular.element('#myDate1').val(), 'DD-MM-YYYY').format('YYYY-MM-DD');
                    $scope.CarInfo.InsuranceExpires = moment(angular.element('#myDate2').val(), 'DD-MM-YYYY').format('YYYY-MM-DD');
                    
                    $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn thêm xe này'), function () {
                        $BookingCar.CreateNewCar($scope.CarInfo, function (res) {
                            switch (res.data.ReturnCode) {
                                case 1:
                                    $modalInstance.close(true);
                                    toastr.success("Đã thêm thành công"); 
                                    break;
                            }
                        });
                    });
                }
                // code

            } catch (e) {
                $modalInstance.close();
                $cookies.remove('AccountInfo');
                $cookies.remove("AccountInfoCheckPermissions");
                $cookies.remove("myReload");
                toastr.error($rootScope.initMessage('InconrectSestion'));
                //  $state.go("login"); 
                $rootScope.showError = true;
            }
        }

        // check upload hình 
        $scope.CheckUploatImg = function (imgURL) {
            if (checkNull(imgURL)) { 
                toastr.error("Vui lòng chọn hình!");
                return false;
            }
            else { 
                return true;
            }
        }
        $scope.removeImage = function () {
            $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL = "";
        }



    } catch (e) {
        $cookies.remove('AccountInfo');
        $cookies.remove("AccountInfoCheckPermissions");
        $cookies.remove("myReload");
        toastr.error("Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.");
        $state.go("login");
    }
    }]);  