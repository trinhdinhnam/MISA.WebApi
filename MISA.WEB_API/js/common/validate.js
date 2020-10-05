var validData = {
    /**-------------------------------------------
     * Hàm validate bắt buộc nhập trên form customer
     * Author: TDNAM (01/10/2020)
     * @param {object} input
     */
    validateRequired: function (input) {
        var value = $(input).val();
        // Thực hiện xem dữ liệu có nhập hay không (khoảng trắng hoặc null..)
        if (!value || !(value && value.trim())) {
            $(input).addClass('not-required');
            $(input).attr('title', 'Trường hợp này không được phép để trống');
            return false;
        }
        else {
            $(input).removeClass('not-required');
            $(input).removeAttr('title');
            return true;


        }
    },
    /**
     * Hàm kiểm tra định dạng nhập vào của Email
     * Author: TDNAM (1/10/2020)
     * @param {object} input
     */
    validateEmail: function (input) {
        var email = input.val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            return false;
        }
        else {
            return true;
        }
    },
    /**
     * Hàm kiểm tra trùng mã khi thêm dữ liệu vào Database
     * @param {object} input
     */
    validateDuplicate: function (input) {
        var Id = input.val();
        $.each(data, function (index, item) {
            if (item.CustomerId == Id) {
                return false;
            } else {
                return true;
            }
        })
    }
}