'use strict';
mainmodule.service('$account', ['$dao', '$cookies', '$state', function ($dao, $cookies, $state) {

    this.Login = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'Account/Login',
            data: request
        }, success, finish)
    };

    this.Logout = function (request, success, finish) {
        $dao.call({
            method: 'Put',
            operater: 'Account/Logout',
            data: request
        }, success, finish)
    };
    this.CheckAccountLogin = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'CheckPermissions/CheckAccont',
            data: request
        }, success, finish)
    };


    this.ChangePassword = function (request, success, finish) {
        $dao.call({
            method: 'Patch',
            operater: 'Account/ChangePassword',
            data: request
        }, success, finish)
    };

    this.getAccountInfo = function () {
        return $cookies.getObject('AccountInfo');
    }

    this.RemoveAccountInfo = function () {
        $cookies.remove("AccountInfo");
        //$cookies.remove("AccountInfoCheck");
        //$cookies.remove("AccountInfo_"); // dùng để kiểm tra account phía dưới 
        //$cookies.remove("ObjRoleCode"); // dùng để kiểm tra Role phía dưới 
        //$cookies.remove("ProfileReqModel"); // 
    }

    this.KiemTraUserLogin = function () {
        if (getUserAccountInfo() === null || getUserAccountInfo() === undefined || getUserAccountInfo() === "") {
            return true;
        } else {
            return false;
        }
    }

    this.ManagerSearchAccount = function (request, success, finish) {
        $dao.call({
            method: 'PUT',
            operater: 'AccountManager/ManagerSearchAccount',
            data: request
        }, success, finish)
    };

    this.ManagerShowDetailAccount = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'AccountManager/ManagerShowDetailAccount',
            data: request
        }, success, finish)
    };

    this.ManagerUpdateStatusRoleByAccountID = function (request, success, finish) {
        $dao.call({
            method: 'PUT',
            operater: 'ManagerUpdateRoleStatus/ManagerUpdateStatusRoleByAccountID',
            data: request
        }, success, finish)
    };

    this.ManagerGetRoleMaster = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'CheckPermissions/ManagerGetRoleMaster',
            data: request
        }, success, finish)
    };
    this.ManagerAddRoleMasterByAccountID = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerUpdateRoleStatus/ManagerAddRoleMasterByAccountID',
            data: request
        }, success, finish)
    };








    //this.CheckAccountLogin = function () {

    //}


    //this.ChangePassword = function (request, success) {
    //    $dao.call({
    //        operater: 'account/ChangePassword',
    //        data: request
    //    }, success)
    //}

    //this.getAccountInfo = function () {
    //    return $cookies.getObject('AccountInfo');
    //}
    //this.RemoveAccountInfo = function () {
    //    $cookies.remove("AccountInfo");
    //}

    //this.getAccountOld = function () {
    //    return $cookies.getObject('AcountOld');
    //}

    //this.RemoveAcountOld = function () {
    //    $cookies.remove("AcountOld");
    //}

    //this.getIsChangePassword = function () {s
    //    return $cookies.getObject('IsChangePassword');
    //}
}]);