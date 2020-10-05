$(document).ready(function () {

})
/**
  * Lớp BaseJS
  * Author: TDNAM (29/09/2020)
  * Edit: TDNAM (30/09/2020) Thêm, sửa xóa bằng cách kế thừa lớp Base
  * */
class BaseJS {
    constructor(name) {
        debugger
        this.getData();
        this.loadData();
        this.initEvent();
        this.getDataById();
        var formMode;

    }
    getData() {
        this.Data = {};
    }
    /**
     * Hàm lấy dữ liệu Customer theo Id
     * Author: TDNAM (02/10/2020)
     * Edit: TDNAM (05/10/2020) 
     * @param {string} Id
     */
    getDataById(Id) {
        this.DataById = {};

    }


    /**
     * Hàm load dữ liệu 
     * Author: TDNAM (29/09/2020)
     * */
    loadData() {
        try {
            // Đọc thông tin các cột dữ liệu
            var fields = $('table thead th');

            console.log(fields);
            // Lấy dữ liệu: 
            debugger
            var self = this;
            //var data = self.Data;
            // Đọc dữ liệu:
            $('.grid table tbody').empty();
            $.each(this.Data, function (index, obj) {
                var tr = $(`<tr></tr>`)
                $.each(fields, function (index, field) {
                    debugger;
                    var fieldName = $(field).attr('fieldName');
                    var td;
                    var value;
                    //switch (fieldName) {
                    //    case 'DateOfBirth':
                    //        value = commonJS.formatDate(obj[fieldName]);

                    //        break;
                    //    case 'Salary':
                    //        value = commonJS.formatMoney(obj[fieldName]);
                    //        break;

                    //    default:
                            value = obj[fieldName];
                    //        break;
                    //}
                    td = $(`<td>` + value + `</td>`);

                    //value = obj[fieldName];

                    $(tr).append(td);
                })
                // Binding dữ liệu lên UI:
                //debugger
                //var trHTML = self.makeTrHTML(obj);
                $('.grid table tbody').append(tr);
                $(this).siblings().removeClass("row-selected");
            })
        } catch (e) {
            console.log('error');
        }
    }

    /**
     * Hàm khởi tạo các sự kiện
     * Author: TDNAM (30/09/2020)
     * */
    initEvent() {
        $('.toolbar-btn-add').click(this.btnAddOnClick.bind(this));
        $('.btn-cancle').click(this.btnCancleOnClick.bind(this));
        $('.fa-times-circle').click(this.btnCancleOnClick.bind(this));
        $('.btn-store').click(this.btnSaveOnClick.bind(this));
        $('input[required]').blur(this.checkRequired);
        $('.toolbar-btn-edit').click(this.btnEditOnClick.bind(this));
        $('.toolbar-btn-del').click(this.btnDeleteOnClick.bind(this));
        //$('#tbCustomer tbody tr').click(this.rowClickTable);
        $("table tbody").on("click", "tr", this.rowClickTable);
        $('#toolbar-btn-load').click(this.btnReloadOnClick.bind(this));
    }

    /**
     * Hàm sự kiện click vào button Thêm
     * Author: TDNAM (30/09/2020)
     * Edit: TDNAM (05/10/2020) Thay đổi giá trị formMode kích hoạt sự kiện cho button cất
     * */
    btnAddOnClick() {
        this.formMode = 1;
        this.showDialogDetail();
    }

    /**
     * Hàm sự kiện click vào button Hủy
     * Author: TDNAM (30/09/2020)
     * */
    btnCancleOnClick() {
        this.hideDialogDetail();
    }
    /**
    * Hàm sự kiện click vào button Cất
    * Author: TDNAM (30/09/2020)
    * */
    btnSaveOnClick() {
        debugger;
        //validate dữ liệu trên form( Kiểm tra dữ liệu nhập trên form có dúng hay không)
        //1. Kiểm tra các trường bắt buôc nhập trên form dialog
        var isValid = true;
        var inputRequired = $('input[required]');
        $.each(inputRequired, function (index, input) {
            if (!validData.validateRequired(input)) {
                isValid = false;
            }
        })
        //2. Kiểm tra index có trùng với index có trong database không
        var isDuplicate = true;
        var inputId = $('.indexObj');
        var fieldNameId = $(inputId).attr('fieldName');
        $.each(data, function (index, item) {
            if (item[fieldNameId] == inputId.val()) {
                isDuplicate = false;
            }
        })

        //3. Kiểm tra tính chính xác của email nhập vào
        var inputEmail = $('#txtEmail');
        var isCheckEmail = validData.validateEmail(inputEmail);
        var inputRequired = $('input[required]');

        try {
            if (isValid) {
                debugger
                if (isCheckEmail) {
                    var method = null;
                    debugger
                    var data = {};
                    //Lấy thông tin nhập vào trên form:
                    var fields = $(".dialog-content input, .dialog-content select, .dialog-content textarea");
                    $.each(fields, function (index, field) {
                        var fieldName = $(field).attr('fieldName');
                        data[fieldName] = $(field).val();
                    })
                    if (this.formMode == 1) {
                        //Khi giá trị của formMode la 1 thì nút cất là Thêm
                        if (isDuplicate) {

                            debugger
                            //Gọi service thực hiện lưu dữ liệu
                            method = "POST";
                            this.postData(data, method);
                        } else {
                            alert('Mã của bản nhập vào đã bị trùng!');

                        }
                    }
                    else if (this.formMode == 2) {
                        debugger
                        //Gọi service thực hiện lưu dữ liệu
                        method = "PUT";
                        this.putData(data, method);

                    }
                } else {
                    alert('Bạn phải nhập đúng địa chỉ email hợp lệ.\nExample@gmail.com');
                }
            }
            else {
                alert('Bạn hãy kiểm tra lại các trường bắt buộc phải được nhập!');
            }
        } catch (e) {
            console.log('error');
        }
    }

    /**
     * Viết hàm load lại dữ liệu
     * Author: TDNAM (30/09/2020)
     * */
    btnReloadOnClick() {
        this.loadData();
    }

    /**
     * Xây dựng hàm gọi service để thêm đối tượng vào csdl
     * @param {object} obj
     * @param {string} method
     */
    postData(obj, method) {

    }

    /**
     * Xây dựng hàm gọi service để cập nhật đối tượng đã sửa vào trong CSDL
     * @param {object} obj
     * @param {string} method
     */
    putData(obj, method) {

    }

    //#endregion "Các sự kiện button";

    /**
     * Hiển thị dialog chi tiết
     * Author: TDNAM (30/09/2020)
     * */
    showDialogDetail() {
        $('.modal').show();
        $('.dialog-form').show();
        var inputId = $('.indexObj');
        inputId.focus();

    }
    /**
     * Ẩn dialog chi tiết
     * Author: TDNAM (30/09/2020)
     * */
    hideDialogDetail() {
        $('.modal').hide();
        $('.dialog-form').hide();
    }

    /**
     * Refresh lại form dialog sau khi thêm, sửa thành công
     * Author: TDNAM (30/09/2020)
     * */

    Refresh() {
        var inputs = $('input[fieldName]');
        $.each(inputs, function (index, input) {
            $('input[fieldName]').val('');
        })
    }
    /**
     * Viết hàm lấy đối tượng khi click vào bảng
     * Author: TDNAM (30/09/2020)
     * TODO: Cần sửa lại
     * */

    rowClickTable() {
        debugger;
        $(this).siblings().removeClass("row-selected");
        $(this).addClass("row-selected");
    }
    /**
     * Viết hàm click vao button Sua
     * Author: TDNAM (30/09/2020)
     * TODO: Cần sửa lại
     * 
     * */
    btnEditOnClick() {
        this.formMode = 2;
        var seft = this;
        //Lấy dữ liệu của khách hàng tương ứng đã chọn
        //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("#tbCustomer tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        try {
            if (trSelected.length > 0) {
                //Hiển thị form chi tiết:
                this.showDialogDetail();
                var Id = $(trSelected).children()[0].textContent;
                //3. Gọi api service để lấy dữ liệu chi tiết của khách hàng

                // Binding dữ liệu lên UI:
                debugger
                seft.getDataById(Id);
                var objId = this.DataById;
                var inputs = $("input[fieldName], select[fieldName]");
                $.each(inputs, function (index, input) {
                    debugger
                    var fieldName = $(input).attr('fieldName');
                    $(input).val(objId[fieldName]);
                })
                //chỉnh sửa thông tin trên form

            } else {
                alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
            }
        } catch (e) {
            console.log('error');
        }

    }
    /**
     * Viết hàm gọi Service để xóa dữ liệu
     * @param {string} Id
     */
    deleteData(Id) {

    }
    /**
     * Viết hàm click vao button Xoa
     * Author: TDNAM (30/09/2020)
     * TODO: Cần sửa lại
     * */
    btnDeleteOnClick() {
        var seft = this;
        //Lấy dữ liệu của khách hàng tương ứng đã chọn
        //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("#tbCustomer tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        if (trSelected.length) {
            //Hiển thị form chi tiết:
            var customerId = $(trSelected).children()[0].textContent
            //3. Gọi api service để lấy dữ liệu chi tiết của khách hàng
            if (customerId) {
                this.deleteData(customerId);
            }
        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
        }

    }

}