'use strict';
mainmodule.service('$BookingCar', ['$dao', '$cookies', '$state', function ($dao, $cookies, $state) {

    this.getListCar = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/GetListCar',
            data: request
        }, success, finish)
    };

    this.getCarInfo = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/GetCarInfo',
            data: request
        }, success, finish)
    };
    this.getListCarType = function (request, success, finish) {
            $dao.call({
                method: 'GET',
                operater: 'Car/GetListCarType',
                data: request
            }, success, finish)
    };

    this.getCarInfoByAccountID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/GetCarInfoByAccountID',
            data: request
        }, success, finish)
    };

    this.updateCarStatus = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/UpdateCarStatus',
            data: request
        }, success, finish)
    };

    this.updateCarInfo = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/UpdateCarInfo',
            data: request
        }, success, finish)
    };

    this.getListCarByCartypeID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/GetListCarByCartypeID',
            data: request
        }, success, finish)
    };

    this.getDetailRepairCost = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerCost/GetDetailRepairCost',
            data: request
        }, success, finish)
    };
    this.getListCost = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerCost/GetListCost',
            data: request
        }, success, finish)
    };
    this.getListCostByCarID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerCost/GetListCostByCarID',
            data: request
        }, success, finish)
    };
    this.getListCostByAccountCreate = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerCost/GetListCostByAccountCreate',
            data: request
        }, success, finish)
    };
    this.reportCost = function (request, success, finish) {
        $dao.call({
            method: 'Get',
            operater: 'ManagerReport/ReportCost',
            data: request
        }, success, finish)
    };
    this.searchCost = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerCost/SearchCost',
            data: request
        }, success, finish)
    };
    this.updateRepairStatus = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerCost/UpdateRepairStatus',
            data: request
        }, success, finish)
    };
    this.getRegistrationCarByCarID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'RegistrationCar/GetRegistrationCarByCarID',
            data: request
        }, success, finish)
    };
    this.getRegistrationCarByDriverID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'RegistrationCar/GetRegistrationCarByDriverID',
            data: request
        }, success, finish)
    };
    this.updateRegistrationCarStatus = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'RegistrationCar/UpdateRegistrationCarStatus',
            data: request
        }, success, finish)
    };
    this.GetListAssignDriver = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'AssignDriver/GetListAssignDriver',
            data: request
        }, success, finish)
    };
    this.GetDriverManageCar = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'AssignDriver/GetDriverManageCar',
            data: request
        }, success, finish)
    };
    //Anh.Trần Crate 14 / 1 / 2019. Tạo mới đơn cấp phát xe
    this.CreateNewRegistrationCar = function (request, success, finish) {
        $dao.call({
            method: 'PUT',
            operater: 'RegistrationCar/CreateNewRegistrationCar',
            data: request
        }, success, finish)
    };
    ///  Dành cho phòng quản trị và BGH
    ///  Lấy danh sách đơn cấp phát dùng chung cho cấp 1 thư ký khoa,2 trưởng khoa, vvv,3,4
    ///  Create by Anh.Tran 15/04/2019
    this.ManagerGetListRegistrationCar = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'RegistrationCar/ManagerGetListRegistrationCarServices',
            data: request
        }, success, finish)
    };
    ///  Create by Anh.Tran 17/04/2019. Tìm kiếm xe
    this.SearchApproveRegistrationCar = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'RegistrationCar/SearchApproveRegistrationCar',
            data: request
        }, success, finish)
    };
}]);