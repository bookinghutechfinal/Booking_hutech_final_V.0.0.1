﻿mainmodule.controller('ManagerReportController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.Init = function () {
            var listReportCost = [];
            $scope.reportCost();
        }

        $scope.reportCost = function () {
            $BookingCar.reportCost({}, function (response) {
                if (response.data.ReturnCode == 1) {
                    listReportCost = response.data.Data.ListReportCost;
                    $scope.tableParams = new NgTableParams({}, { dataset: listReportCost });
                }
            });
        }

        $scope.Init();
        //$scope.dataChart = listReportCost;
        $scope.dataChart = [
            {
                "label": "KG-1 0001",
                "value": 100000
            },
            {
                "label": "KG-1 0002",
                "value": 200000
            },
            {
                "label": "KG-1 0003",
                "value": 300000
            },
            {
                "label": "KG-1 0004",
                "value": 8000000
            },
            {
                "label": "KG-1 0005",
                "value": 50000
            },
            {
                "label": "KG-1 0007",
                "value": 260000
            },
            {
                "label": "KG-1 0008",
                "value": 3900000
            }
        ];
        $scope.myDataSource = {
            "chart": {
                "caption": "Thống kê chi phí xe trong tháng",
                "subCaption": "Tháng 4/2019",
                "xAxisName": "Xe",
                "yAxisName": "Tổng tiền",
                "numberSuffix": "Đ",
                "theme": "fusion",
            },
            "data": $scope.dataChart
        };
    }]);  