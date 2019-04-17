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
    this.ManagerUpdateAccount = function (request, success, finish) {
        $dao.call({
            method: 'Patch',
            operater: 'Account/ManagerUpdateAccount',
            data: request
        }, success, finish)
    }

    this.GetListDriverNotInAssignDriver = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'Account/GetListDriverNotInAssignDriver',
            data: request
        }, success, finish)
    }

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
        $cookies.remove("AccountInfoCheckPermissions");
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

    this.ManagerGetDetailAccountByAccountID = function (request, success, finish) {
        $dao.call({
            method: 'PUT',
            operater: 'ManagerAccount/ManagerGetDetailAccountByAccountID',
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
    // Lấy danh sách lái xe. 
    this.ManagerGetListDriverByDriverStatus = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'ManagerDriver/ManagerGetListDriverByDriverStatus',
            data: request
        }, success, finish)
    };

    // Cập nhật nhóm quyền. 
    this.ManagerUpdateGroupRole = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerGroupRole/UpdateGroupRole',
            data: request
        }, success, finish)
    }
    // Lấy danh sách nhóm quyền.
    this.ManagerGetListGroupRole = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'ManagerGroupRole/ManagerGetGroupRole',
            data: request
        }, success, finish)
    }
    // Phân quyền
    this.ManagerDecentralization = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ManagerDecentralization/Decentralization',
            data: request
        }, success, finish)
    }

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
    this.ManagerGetUnit = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'ManagerUnit/ManagerGetUnit',
            data: request
        }, success, finish)
    }
    this.ManagerCreateNewAccount = function (request, success, finish) {
        $dao.call({
            method: 'Patch',
            operater: 'ManagerAccount/ManagerCreateNewAccount',
            data: request
        }, success, finish)
    }
    this.ManagerGetAccountByAccountStatusAccountType = function (request, success, finish) {
        $dao.call({
            method: 'Post',
            operater: 'ManagerAccount/ManagerGetAccountByAccountStatusAccountType',
            data: request
        }, success, finish)
    }

    this.ManagerGetRoleMaster = function (request, success, finish) {
        $dao.call({
            method: 'GET',
            operater: 'ManagerRoleMaster/ManagerGetRoleMaster',
            data: request
        }, success, finish)
    }
    this.ManagerUpdateRoleMaster = function (request, success, finish) {
        $dao.call({
            method: 'PUT',
            operater: 'ManagerRoleMaster/ManagerUpdateRoleMaster',
            data: request
        }, success, finish)
    }
    this.EditProfiAccount = function (request, success, finish) {
        $dao.call({
            method: 'POST',
            operater: 'ProfileAccount/EditProfiAccount',
            data: request
        }, success, finish)
    }
   

  

     


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