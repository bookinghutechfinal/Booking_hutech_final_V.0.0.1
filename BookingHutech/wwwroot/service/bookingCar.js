'use strict';
mainmodule.service('$BookingCar', ['$dao', '$cookies', '$state', function ($dao, $cookies, $state) {

    this.getListCar = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'Car/GetListCar',
            data: request
        }, success, finish)
    };

}]);