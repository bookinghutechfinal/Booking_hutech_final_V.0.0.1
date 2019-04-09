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

    this.getListCarByCartypeID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Car/GetListCarByCartypeID',
            data: request
        }, success, finish)
    };

    this.getListRepairCost = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'ManagerCost/GetListRepairCost',
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
}]);