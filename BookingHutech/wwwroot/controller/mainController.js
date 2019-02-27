
// vùng hiển thị dự liệu chính. 
mainmodule.controller('mainController', ['$scope', '$state', '$rootScope', '$modal', '$http', '$cookies', 'toastr', '$dao',  
    function ($scope, $state, $rootScope, $modal, $http, $cookies, toastr, $dao) {
       
        $scope.UserName = "Anh"; 

        $scope.logout = function () {
            //toastr.success("Logout");
            var modalInstance = $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/popupLogout.html',
                controller: 'LogoutController',
                controllerAs: 'content',
                backdrop: 'static',
                size: 'sm',
                resolve: {
                    RequestData: function () {
                        return null;
                    },
                }
            });
            modalInstance.result.then(function () {

            });
        }
    }]);  