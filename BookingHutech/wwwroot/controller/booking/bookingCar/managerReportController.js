mainmodule.controller('ManagerReportController', ['$scope', '$state', '$rootScope', '$modal', '$cookies', 'toastr', '$BookingCar', 'NgTableParams',
    function ($scope, $state, $rootScope, $modal, $cookies, toastr, $BookingCar, NgTableParams) {

        $scope.Init = function () {
            let today = new Date();
            $scope.ReportRequestModel = {
                Month: today.getMonth() + 1,
                Year: today.getFullYear(),
                ReportType: 1,
                YearQuarter: 1,
                DateFrom: today,
                DateTo: today
            }
            $scope.subCaption = `Thang ${$scope.ReportRequestModel.Month}/${$scope.ReportRequestModel.Year}`;
            $scope.reportCost();
            $scope.ReportCost = {
                Year: 2019,
            }
        }

        $scope.reportCost = function () {
            if ($rootScope.CheckCookies()) {
                $scope.ReportCostData = [];

                $BookingCar.reportCost($scope.ReportRequestModel, function (response) {
                    if (response.data.ReturnCode == 1) {
                        listReportCost = response.data.Data.ListReportCost;
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
        }

        if ($rootScope.CheckCookies()) {
            $scope.Init();
        }

        $scope.reportCostType = function (request) {
            if ($rootScope.CheckCookies()) {
                var count = $scope.ReportCostData.length;
                for (var i = 0; i < count; i++) {
                    $scope.ReportCostData.pop();
                }

                listReportCost = [];
                $scope.tableParams = $scope.tableParams = null;

                $scope.ReportRequestModel.ReportType = request.ReportType;
                if (request.ReportType == 1) {
                    $scope.ReportRequestModel.Year = request.Year;
                    $scope.ReportRequestModel.Month = request.Month;
                    $scope.subCaption = `Tháng ${$scope.ReportRequestModel.Month}/${$scope.ReportRequestModel.Year}`;
                }
                if (request.ReportType == 3) {
                    $scope.ReportRequestModel.Year = request.Year;
                    $scope.subCaption = `Năm ${$scope.ReportRequestModel.Year}`;
                }
                if (request.ReportType == 2) {
                    $scope.ReportRequestModel.DateFrom = FormatDateTimeToDBRequest(angular.element('#myDate1').val());
                    $scope.ReportRequestModel.DateTo = FormatDateTimeToDBRequest(angular.element('#myDate2').val());
                    $scope.subCaption = `Từ ngày ${$scope.ReportRequestModel.DateFrom} - ${$scope.ReportRequestModel.DateTo}`;
                }

                $BookingCar.reportCost($scope.ReportRequestModel, function (response) {
                    if (response.data.ReturnCode == 1) {
                        listReportCost = response.data.Data.ListReportCost;
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
        }

        var mystyle = {
            sheetid: 'Chi phí hoạt động xe',
            headers: true,
            caption: {
                title: 'Báo cáo chi phí xe',
                style: 'font-size: 200px;'
            },
            column: {
                style: 'font-size:20px'
            },
            columns: [
                { columnid: 'label', title: 'Tên xe' },
                { columnid: 'value', title: 'Tổng tiền' },
            ],

        };

        $scope.exportData = function () {
            alasql('SELECT * INTO XLS("alexa.xls",?) FROM ?', [mystyle, listReportCost]);
        };

        $scope.myDataSource = {
            "chart": {
                "caption": "Thống kê chi phí xe",
                "subCaption": $scope.subCaption,
                "xAxisName": "Xe",
                "yAxisName": "Tổng tiền",
                "numberSuffix": "",
                "theme": "fusion",
            },
            //"data": $scope.dataChart
            "data": $scope.ReportCostData
        };
    }]);  