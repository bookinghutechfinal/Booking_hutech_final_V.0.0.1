'use strict';
mainmodule.service('$alert', ['SweetAlert', '$rootScope', function (SweetAlert, $rootScope) {
    this.showError = function (msg) {
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

    this.showWarningWithButton = function (msg) {
        SweetAlert.swal({
            type: 'warning',
            title: '',
            text: msg,
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

    this.showNotFound = function () {
        noty({
            theme: 'urban-noty',
            text: lang.notFound,
            type: 'information ',
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

    this.showPopupParam = function (msg, param) {
        SweetAlert.swal({
            type: 'error',
            title: lang.unSuccess,
            text: msg.replace(/{{downloadlink}}/g, param),
            html: true,
            showConfirmButton: true
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

    this.showConfirmAddNew = function (mesg, ok) {
        SweetAlert.swal({
            title: '',
            text: mesg,
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: $rootScope.initMessage('Accept'),
            cancelButtonText: $rootScope.initMessage('Cancel'),
            closeOnConfirm: true
        }, function (IsOk) {
            if (IsOk) {
                ok();
            };
        });
    }

    this.showConfirmUpdateNewProfile = function (mesg, ok) {
        SweetAlert.swal({
            title: '',
            text: mesg,
            type: "success",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: $rootScope.initMessage('Yes'),
            cancelButtonText: $rootScope.initMessage('No'),
            closeOnConfirm: true
        }, function (IsOk) {
            if (IsOk) {
                ok();
            };
        });
    }

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

}]);