var languageManager = {
    VN: {
        'dateFormat': 'DD/MM/YYYY',
        'searchCondition': 'Điều kiện tìm kiếm',
        'account': 'Tài khoản',
        'accountInfo': 'Thông tin tài khoản',
        'fromDate': 'Từ ngày',
        'toDate': 'Đến ngày',
        'search': 'Tìm kiếm',
        'searchResult': 'Kết quả tìm kiếm',
        'warming': 'Xác nhận',
        'confirmButtonText': 'Có',
        'cancelButtonText': 'Không',
        'STT': 'STT',
        'all': '(Tất cả)',

        'promotionManagement': 'Quản lý CTKM',
        'promotionCode': 'Mã CTKM',
        'addPromotion': 'Thêm mới CTKM',
        'promotionCode': 'Mã CTKM',
        'promotionName': 'Tên CTKM',
        'startDate': 'Ngày bắt đầu',
        'endDate': 'Ngày kết thúc',
        'createBy': 'Người tạo',
        'createTime': 'Thời gian tạo',
        'updateTime': 'Thời gian cập nhật',
        'addPromotionTitle': 'Thêm mới chương trình khuyến mãi',
        'updatePromotionTitle': 'Cập nhật chương trình khuyến mãi',
        'close': 'Đóng',
        'addNew': 'Thêm mới',
        'update': 'Cập nhật',
        'delete': 'Xóa',
        'note': 'Ghi chú',
        'chainApply': 'Chuỗi/Cửa hàng áp dụng',
        'chainCode': 'Mã chuỗi',
        'chainName': 'Tên chuỗi',
        'status': 'Trạng thái',

        //Message=========================


        'maxDate30': 'Thời gian tìm kiếm phải < =  30 ngày.',
        'noChooseDate': 'Vui lòng chọn ngày để xem dữ liệu.',
        'errorMsg': 'Có lỗi trong quá trình xử lý. Vui lòng thực hiện lại.',
        'loginErrorMsg': 'Tên đăng nhập không đúng. Vui lòng kiểm tra lại!',
        'passwordError': 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!',
        'accountLockedMsg': 'Tài khoản này đã bị khóa. Vui lòng kiểm tra lại!',
        'notFound': 'Không tìm thấy kết quả!',
        'youDoNotHavePermission': 'Bạn không có quyền thực hiện chức năng này!',
        'loginAgain': 'Vui lòng đăng nhập để tiếp tục sử dụng!',
        'fromtoDateError': 'Từ ngày phải nhỏ hơn hoặc bằng đến ngày.',
        'dupPromotionCodeMsg': 'Đã tồn tại mã CTKM.',
        'updateSuccess': 'Cập nhật thông tin thành công!',
        'success': 'Thành công',
        'noPermissionMsg': 'Bạn không có quyền thực hiện chức năng này',
        'confirmDeletePromotion': 'Bạn có chắc chắn xóa chương trình khuyến mãi này không?',

        //Status===========================

        'promotionStatusName': ['Xóa', 'Hoạt động'],

        'calendarOption': {
            autoApply: true,
            maxDate: Date.now(),
            singleDatePicker: true,
            showDropdowns: true,
            timePicker: true,
            timePicker24Hour: true,
            format: 'DD/MM/YYYY HH:mm',
            locale: {
                "format": "DD/MM/YYYY HH:mm",
                "separator": " - ",
                "applyLabel": "Chọn",
                "cancelLabel": "Đóng",
                "fromLabel": "Từ ngày",
                "toLabel": "Đến ngày",
                "daysOfWeek": [
                    "CN",
                    "T2",
                    "T3",
                    "T4",
                    "T5",
                    "T6",
                    "T7"
                ],
                "monthNames": [
                    "Th 1",
                    "Th 2",
                    "Th 3",
                    "Th 4",
                    "Th 5",
                    "Th 6",
                    "Th 7",
                    "Th 8",
                    "Th 9",
                    "Th 10",
                    "Th 11",
                    "Th 12"
                ],
                "firstDay": 1
            }
        },

        'singleCalendarOption': {
            autoApply: true,
            autoclose: true,
            format: 'dd/mm/yyyy',
            keepOpen: false,
            inline: true,
            sideBySide: true,
            language: 'vi',
        },

        'singleCalendarFromNowOption': {
            autoApply: true,
            autoclose: true,
            format: 'dd/mm/yyyy',
            keepOpen: false,
            inline: true,
            sideBySide: true,
            language: 'vi',
            startDate: new Date(),
        }
    }
};

var lang = languageManager.VN;
