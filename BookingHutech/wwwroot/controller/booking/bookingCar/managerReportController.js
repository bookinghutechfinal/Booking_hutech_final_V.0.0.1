mainmodule.controller('ManagerReportController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.Init = function () { 
            $scope.reportCost();
        }
        $scope.ReportCostData = []; 
        $scope.reportCost = function () {
            $BookingCar.reportCost({}, function (response) {
                if (response.data.ReturnCode == 1) {
                    var listReportCost = response.data.Data.ListReportCost; 
                    $scope.tableParams = new NgTableParams({}, { dataset: listReportCost });
                } 
                for (var i = 0; i < listReportCost.length; i++) {
                    var obj = {
                        "label": null,
                        "value": null
                    };
                     obj = {
                        "label": listReportCost[i].label,
                        "value": listReportCost[i].value,
                    }
                    $scope.ReportCostData.push(obj); 

                }
            });
        }

        $scope.Init();

        $scope.myDataSource = {
            "chart": {
                "caption": "Thống kê chi phí xe trong tháng",
                "subCaption": "Tháng 4/2019",
                "xAxisName": "Xe",
                "yAxisName": "Tổng tiền",
                "numberSuffix": "",
                "theme": "fusion",
            },
            //"data": $scope.dataChart
            "data": $scope.ReportCostData
        };
    }]);  