mainmodule.controller('AssignDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$alert', '$account',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $alert, $account) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 

        $scope.init = function () {
            $scope.DriverWithCar = [];
            $scope.tableParams = $scope.tableParams = null;
//<<<<<<< HEAD
            
            $scope.GetDriverWithCar();
//=======

            //$scope.ManagerGetListAccount();
            //$scope.GetDriverWithCar();
            $scope.GetListAssigned();
//>>>>>>> BookingHutechFinal_Anh
        }

        //Lấy danh sách lái xe chưa được phân công
        $scope.ManagerGetListAccount = function () {
            $account.GetListDriverNotInAssignDriver({}, function (res) {
                switch (res.data.ReturnCode) {

                    case 1:
                        $scope.ManagerGetListAccountResponse = res.data.Data.GetAccountInfo;
//<<<<<<< HEAD
                        $scope.GetListAssigned();
//=======
                      
//>>>>>>> BookingHutechFinal_Anh
                        break;
                }
            });
        }
        //Lấy danh sách tất cả xe kèm lái xe đã được phân công
        $scope.GetDriverWithCar = function () {
            $BookingCar.GetListAssignDriver({}, function (res) {
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ListAssignDriver = res.data.Data;
//<<<<<<< HEAD
                        $scope.ManagerGetListAccount();
//=======
//                        $scope.ManagerGetListAccount(); 
//>>>>>>> BookingHutechFinal_Anh
                        break;
                }
            });
        }
        //Lấy lịch sử phân công
        $scope.GetListAssigned = function () {
            $BookingCar.GetListAssigned({}, function (res) {
                switch (res.data.ReturnCode) {

                    case 1:
                        $scope.tableParams = new NgTableParams({}, { dataset: res.data.Data });
                        $scope.GetDriverWithCar();
                        break;
                }
            });
        }

        $scope.init();

        $scope.updateAssign = function (acountID, item) {
            if (acountID == null) {
                var Account_ID = item.Account_ID;
            }
            else 
                var Account_ID = acountID;
            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn cập nhật phân công?'), function () {
                var AssignDriverManagerRequestModel = {
                    Account_ID: Account_ID,
                    CarID: item.CarID,
                    FullNameUpdate: AccountInfo.ObjAccountInfo.FullName
                }
                $BookingCar.AssignDriverManager(AssignDriverManagerRequestModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 1:
                            toastr.success('Cập nhật thành công.');
                            $scope.GetDriverWithCar();
                            break;
                        case 2:
                            toastr.error('Cập nhật thất bại.');
                            $scope.GetDriverWithCar();
                            break;
                    }
                });
            });
        }
    }]);

mainmodule.controller('popupAssignDriverController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams', '$modalInstance',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams, $modalInstance) {

        $scope.init = function () {
        }

        $scope.ClosePopup = function () {
            $modalInstance.close();
        }

        $scope.init();

    }]);  