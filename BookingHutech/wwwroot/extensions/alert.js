'use strict';
angular.module('BHutechMainModule').service('$alert', ['SweetAlert', '$rootScope', function (SweetAlert) {
    this.showError = function (msg = lang.eerrorMsg) {
        noty({
            theme: 'urban-noty',
            text: msg,
            type: 'error',
            timeout: 3000,
            layout: 'topRight',
            closeWith: ['button', 'click'],
            animation: {
                open: 'in',
                close: 'out',
                easing: 'swing'
            },
        });
    };

    this.showSuccessNoty = function (msg) {
        noty({
            theme: 'urban-noty',
            text: msg,
            type: 'success',
            timeout: 2000,
            layout: 'topRight',
            closeWith: ['button', 'click'],
            animation: {
                open: 'in',
                close: 'out',
                easing: 'swing'
            },
        });
    };

    this.showSuccess = function (msg) {
        SweetAlert.swal({
            type: 'success',
            title: lang.success,
            text: msg,
            timer: 1800,
            showConfirmButton: false
        });
    };

    this.showPopupError = function (msg) {
        SweetAlert.swal({
            type: 'error',
            title: lang.unSuccess,
            text: msg.replace(/{{downloadlink}}/g, '#/abc'),
            html: true,
            //timer: 1800,
            showConfirmButton: true
        });
    };

    this.showPopupError = function (msg) {
        SweetAlert.swal({
            type: 'error',
            title: lang.unSuccess,
            text: msg,
            html: true,
            //timer: 1800,
            showConfirmButton: true
        });
    };

    this.showPopupParam = function (msg, param) {
        SweetAlert.swal({
            type: 'error',
            title: lang.unSuccess,
            text: msg.replace(/{{downloadlink}}/g, param),
            html: true,
            //timer: 1800,
            showConfirmButton: true
        });
    };


    this.showSuccessWithBtn = function (msg) {
        SweetAlert.swal({
            type: 'success',
            title: lang.success,
            text: msg,
        });
    };

    this.showNotFound = function (msg) {
        if (!msg) {
            msg = lang.notFound;
        }
        noty({
            theme: 'urban-noty',
            text: msg,
            type: 'warning ',
            timeout: 3000,
            layout: 'topRight',
            closeWith: ['button', 'click'],
            animation: {
                open: 'in',
                close: 'out',
                easing: 'swing'
            },
        });
    };

    this.showImage = function (imgData, imgSize) {
        SweetAlert.swal({
            imageUrl: 'data:image/jpeg;base64,' + imgData,
            imageSize: imgSize,
            title: '',
            // text: lang.notFoundMsg,
            // timer: 2300,
            showConfirmButton: true
        });
    };

    this.showConfirm = function (mesg, ok) {
        SweetAlert.swal({
            title: lang.warming,
            text: mesg,
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: lang.confirmButtonText,
            cancelButtonText: lang.cancelButtonText,
            closeOnConfirm: true
        }, function (IsOk) {
            if (IsOk) {
                ok();
            };
            return true;
        });
    }

}]);
