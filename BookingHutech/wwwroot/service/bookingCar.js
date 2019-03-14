'use strict';
mainmodule.service('$BookingCar', ['$dao', '$cookies', '$state', function ($dao, $cookies, $state) {

    this.getListCar = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'Car/GetListCar',
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
    this.reportCost = function (request, success, finish) {
        $dao.call({
            method: 'Get',
            operater: 'ManagerReport/ReportCost',
            data: request
        }, success, finish)
    };
}]);