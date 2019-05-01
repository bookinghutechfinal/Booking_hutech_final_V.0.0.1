'use strict';
mainmodule.service('$dao', ['$http', '$cookies', '$state', '$rootScope', '$interval', '$translate', 'toastr',
    function ($http, $cookies, $state, $rootScope, $interval, $translate, toastr) {

        $rootScope.initMessage = function (strTranslate) {
            return $translate.instant(strTranslate);
        }
        this.call = function (request, success, finish) {
            $rootScope.isLoading = true;
            $rootScope.showError = false;
            $rootScope.isTimeOutRequest = false;
            $http({
                method: request.method,
                url: "/Api/" + request.operater,
                data: request.data,
                headers: {
                    'BHAPIWebCall': 'Web'
                }
            }).then(function mySucces(response) {
                $rootScope.isLoading = false;
                $rootScope.$emit('showLoading', false);
                if (response.data === null) {
                    toastr.success('Không tìm thấy kết quả!');
                }
                else if (response.data.ReturnCode === 2) {
                    var audio = new Audio('../../audio/alert_message_audio.mp3');
                    audio.play();
                    audio.volume = 0.1; 
                    $rootScope.isTimeOutRequest = true;
                }
                else if (response.data.ReturnCode === 114) {
                    toastr.error('Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập.!');
                    $cookies.remove('AccountInfo');
                    $cookies.remove("AccountInfoCheckPermissions");
                    $rootScope.showError = true;

                }
                else if (response.data.ReturnCode === 150) {
                    toastr.error('Xin lỗi! Bạn không có quyền thực hiện chức năng này!');
                }
                else if (response.data.ReturnCode === 102) {
                    toastr.error('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để được hướng dẫn!');
                    $cookies.remove('AccountInfo');
                    $cookies.remove("AccountInfoCheckPermissions");
                    $state.go('login');
                    //location.reload(); 
                }
                else if (response.data.ReturnCode === 3) {
                    toastr.error('Danh nhap that bai');
                }
                else {
                    success(response);
                }
                if (finish) {
                    finish();
                }
            }, function myError(response) {

                if (response.status === -1) {
                    var audio = new Audio('../../audio/alert_message_audio.mp3');
                    audio.play();
                    audio.volume = 0.1;
                    $cookies.remove("AccountInfo");
                    $cookies.remove("AccountInfoCheckPermissions");
                    $rootScope.isTimeOutRequest = true;
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
