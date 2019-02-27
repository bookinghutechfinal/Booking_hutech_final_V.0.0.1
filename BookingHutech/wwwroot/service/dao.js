 'use strict';
mainmodule.service('$dao', ['$http', '$cookies', '$state', '$rootScope', '$interval', '$translate', 'toastr',
    function ($http, $cookies, $state, $rootScope, $interval, $translate, toastr, ) {

        $rootScope.initMessage = function (strTranslate) {
            return $translate.instant(strTranslate);
        } 
        this.call = function (request, success, finish) {
            $rootScope.isLoading = true;
            $http({ 
                method: request.method,
                url: "/Api/" + request.operater,
                data: request.data,
            }).then(function mySucces(response) {
                $rootScope.isLoading = false;
                $rootScope.$emit('showLoading', false);
                if (response.data === null) {
                    toastr.success('Không tìm thấy kết quả!');
                } //User is delete
                else if (response.data.ReturnCode === 2) {
                    toastr.error('Hệ thống có lỗi trong quá trình xử lý!');
                }
               
                else {
                    success(response);
                }
                if (finish) {
                    finish();
                }
            }, function myError(response) {
                if (response.status == 401) { 
                    $cookies.remove('AccountInfo');
                    $state.go('login');
                }
                else {
                    error(response);
                }
                if (finish) {
                    finish();
                }
            });
        };
    }]);
