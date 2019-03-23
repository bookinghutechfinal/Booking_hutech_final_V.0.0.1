// Thêm mới tài khoản 
mainmodule.controller('ManagerCreateNewAccountController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao', '$account', 'NgTableParams', '$modal', '$modalInstance','$alert',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account, NgTableParams, $modal, $modalInstance, $alert) {

        var AccountInfo = $account.getAccountInfo(); // Lấy cookies người dùng. 
        $scope.goToHome = function () {
            $state.go('main.home');
            return;
        };
        $scope.goToChangePassword = function () {
            $state.go('changePassword');
            return;
        };
        $scope.goToLogin = function () {
            $state.go('login');
            return;
        };

        $scope.ClosePopup = function () {
            $modalInstance.close();

        }

        // Lấy danh sách đơn vị/ khoa, viện phòng ban.  
        $scope.ManagerGetListUnit = function () {
            $account.ManagerGetUnit({}, function (res) {
                debugger
                switch (res.data.ReturnCode) {
                    case 1:
                        $scope.ManagerGetListUnitResponse = res.data.Data.ListUnit;
                        //var RoleResponse = res.data.Data.GetRoleCode; 
                        //// Hiển thị thông tin account
                        //$scope.ShowAccountInfo = {
                        //    FullName: AccountInfoResponse.FullName,
                        //    Gender: AccountInfoResponse.Gender,
                        //    Birthday: AccountInfoResponse.Birthday,
                        //    Addres: AccountInfoResponse.Addres,
                        //    AccountType: AccountInfoResponse.AccountType,
                        //    NumberPhone: AccountInfoResponse.NumberPhone,
                        //    Email: AccountInfoResponse.Email,
                        //    UnitName: AccountInfoResponse.UnitName,
                        //} 
                        ////Cập nhật trạng thái cho quyền. 
                        //for (var i = 0; i < RoleResponse.length; i++) {
                        //    // AccountStatusName
                        //    if (RoleResponse[i].RoleDetail_Status === false) {
                        //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[0].RoleStatusName;
                        //    } else {
                        //        RoleResponse[i].RoleDetail_Status = $scope.RoleStatus[1].RoleStatusName;
                        //    }

                        //}
                        //// Hiển thị thông tin quyền  
                        break;
                }

            });
        }

        $scope.main = function () {
            // show messager 
            $scope.ipFullName = false;
            // model
            $scope.CreateNewAccountmModel = {
                "FullName": null,
                "NumberPhone": null,
                "Email": null,
                "Addres": null,
                "Gender": null,
                "BirthDay": null,
                "UserName": null,
                "Password": null,
                "Unit_ID": null,
                "AccountType": null,
                "DriverLicenseNo": null,
                "LicenseClass": null,
                "LicenseExpires": null,
                "Avatar": null,
            };
            // img 
            $scope.ImageModel = {
                CHAN_DUNG: {
                    ImageName: 1,
                    ImageData: {
                        compressed: {
                            dataURL: null
                        }
                    },
                },
            }
            $scope.AccountType = AccountTypeRequest; 
            $scope.ManagerGetListUnitResponse = [];
            $scope.ManagerGetListUnit();
        }

        // kiểm tra account đẵ đăng nhập chưa, đổi mật khẩu chưa. 
        var result = CheckAccountLoginAndChangePass(AccountInfo);
        switch (result) {
            case 2:
                //toastr.success($rootScope.initMessage('MessageChangeAccount'));
                $scope.ClosePopup();
                $scope.goToChangePassword();
                break;
            case 3:
                $scope.main()
                break;
            case 1:
                $scope.ClosePopup();
                $scope.goToLogin();
                break;

        }
        $scope.btndisabled = true;
        $scope.isDriver = false;
        $scope.TestInputChange = function (Request) {

            // check show theo loại tài khoa
            if (Request.AccountType === "5") {
                $scope.isDriver = true;
                if (checkNull(Request.DriverLicenseNo)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.LicenseClass)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.LicenseExpires)) {
                    $scope.btndisabled = true;
                    return;
                }  
                else {
                    $scope.btndisabled = false;
                }
            }

            if (Request.AccountType !== "5") {
                $scope.isDriver = false;
                // check data
                if (checkNull(Request.FullName)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Gender)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.NumberPhone)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Email)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Addres)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.BirthDay)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.UserName)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Password)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.Unit_ID)) {
                    $scope.btndisabled = true;
                    return;
                } else if (checkNull(Request.AccountType)) {
                    $scope.btndisabled = true;
                    return;
                }
                else {
                    $scope.btndisabled = false;
                }
            } 
          
            
        }

        // Lấy thông tin chi tiết lái xe. 
        $scope.CeateNewAccount = function (imgUrl) { 
            $scope.CreateNewAccountmModel.Avatar = imgUrl;  

            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn thêm người dùng này'), function () {
                $account.ManagerCreateNewAccount($scope.CreateNewAccountmModel, function (res) {
                    switch (res.data.ReturnCode) { 
                        case 1:
                           // $state.go('Admin.ProductManager');
                            toastr.success("Đã thêm thành công");
                            //$state.reload();
                            break;  
                    }
                });
            });  

        }

        // xóa hình
        $scope.removeImage = function () {
            $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL = "";
        }


    }]);  

// upload hình  
mainmodule.directive('ngImageCompress', ['$q',
    function ($q) {

        var URL = window.URL || window.webkitURL;

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';

            var resizeArea = document.getElementById(resizeAreaId);

            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
                document.body.appendChild(resizeArea);
            }

            return resizeArea;
        };

        /**
         * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
         * @param {Image} sourceImgObj The source Image Object
         * @param {Integer} quality The output quality of Image Object
         * @return {Image} result_image_obj The compressed Image Object
         */

        var jicCompress = function (sourceImgObj, options) {

            var outputFormat = options.resizeType;
            var quality = options.resizeQuality * 100 || 70;
            var mimeType = '';
            if (outputFormat !== undefined && outputFormat === 'png') {
                mimeType = 'image/png';
            } else if (outputFormat !== undefined && (outputFormat === 'jpg' || outputFormat === 'jpeg' || outputFormat === 'image/jpg' || outputFormat === 'image/jpeg')) {
                //mimeType = 'image/jpeg';
                mimeType = 'image/png';
            } else {
                mimeType = outputFormat;
            }


            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;

            var height = sourceImgObj.height;
            var width = sourceImgObj.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            var cvs = document.createElement('canvas');
            cvs.width = width; //sourceImgObj.naturalWidth;
            cvs.height = height; //sourceImgObj.naturalHeight;
            var ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
            var newImageData = cvs.toDataURL(mimeType, quality / 100);
            var resultImageObj = new Image();
            resultImageObj.src = newImageData;
            return resultImageObj.src;

        };

        var resizeImage = function (origImage, options) {
            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;
            //var quality = options.resizeQuality || 0.7;
            var quality = options.resizeQuality || 0.6;
            var type = options.resizeType || 'image/jpg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            //draw image on canvas
            var ctx = canvas.getContext('2d');
            ctx.drawImage(origImage, 0, 0, width, height);

            // get the data from canvas as 70% jpg (or specified type).
            return canvas.toDataURL(type, quality);
        };

        var createImage = function (url, callback) {
            var image = new Image();
            image.onload = function () {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };


        return {
            restrict: 'A',
            scope: {
                image: '=',
                resizeMaxHeight: '@?',
                resizeMaxWidth: '@?',
                resizeQuality: '@?',
                resizeType: '@?'
            },
            link: function postLink(scope, element, attrs) {

                var doResizing = function (imageResult, callback) {
                    createImage(imageResult.url, function (image) {
                        //var dataURL = resizeImage(image, scope);
                        var dataURLcompressed = jicCompress(image, scope);
                        // imageResult.resized = {
                        // 	dataURL: dataURL,
                        // 	type: dataURL.match(/:(.+\/.+);/)[1]
                        // };
                        imageResult.compressed = {
                            dataURL: dataURLcompressed,
                            type: dataURLcompressed.match(/:(.+\/.+);/)[1]
                        };
                        callback(imageResult);
                    });
                };

                var applyScope = function (imageResult) {
                    scope.$apply(function () {
                        if (attrs.multiple) {
                            scope.image.push(imageResult);
                        } else {
                            scope.image = imageResult;
                        }
                    });
                };


                element.bind('click', function (evt) {
                    $("#file1").val("");
                    if (attrs.multiple) {
                        scope.image = [];
                    }

                    var files = evt.target.files;
                    for (var i = 0; i < files.length; i++) {
                        if (scope.resizeType === undefined || scope.resizeType == '') {
                            scope.resizeType = files[i].type;
                        }
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function (imageResult) {
                                applyScope(imageResult);
                            });
                        } else { //no resizing
                            applyScope(imageResult);
                        }
                    }
                });

                element.bind('change', function (evt) {
                    //when multiple always return an array of images
                    if (attrs.multiple) {
                        scope.image = [];
                    }

                    var files = evt.target.files;
                    for (var i = 0; i < files.length; i++) {
                        if (scope.resizeType === undefined || scope.resizeType == '') {
                            scope.resizeType = files[i].type;
                        }
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function (imageResult) {
                                applyScope(imageResult);
                            });
                        } else { //no resizing
                            applyScope(imageResult);
                        }
                    }
                });
            }
        };
    }
]);
