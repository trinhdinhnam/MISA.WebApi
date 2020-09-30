$(document).ready(function () {
    baseJS = new BaseJS();

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
        this.getDataById(Id);
        this.loadData();
        this.initEvent();

    }
    getData() {
        this.Data = {};
    }

    getDataById(Id) {
        this.DataId = {};
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
                    var value = obj[fieldName];
                    var td = $(`<td>` + value + `</td>`);
                    $(tr).append(td);
                })
                // Binding dữ liệu lên UI:
                //debugger
                //var trHTML = self.makeTrHTML(obj);
                $('.grid table tbody').append(tr);
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
     * */
    btnAddOnClick() {
        this.Getbutton = 1;
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
        var self = this;
        var method = null;

        try {
            var data = {};
            //Lấy thông tin nhập vào trên form:
            var fields = $(".dialog-content input, .dialog-content select, .dialog-content textarea");
            $.each(fields, function (index, field) {
                var fieldName = $(field).attr('fieldName');
                data[fieldName] = $(field).val();
            })
            if (self.Getbutton == 1) {
                method = "POST";
                this.postData(data, method);

            }
            else if (self.Getbutton == 2) {
                method = "PUT";
                this.putData(data, method);

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


    postData(obj, menthod) {

    }
    /**
     * Hàm kiểm tra validate dữ liệu
     * Author: TDNAM (30/09/2020)
     * */

    //#endregion "Các sự kiện button";
    checkRequired() {
        var value = this.value;

        if (!value) {
            $(this).addClass("required-error");
            $(this).attr("title", "Bạn phải nhập thông tin này!");
        } else {
            $(this).removeClass("required-error");
            $(this).removeAttr("title");
        }

    }
    /**
     * Hiển thị dialog chi tiết
     * Author: TDNAM (30/09/2020)
     * */
    showDialogDetail() {
        $('.modal').show();
        $('.dialog-form').show();
        $("#txtCustomerId").focus();

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
        $("#txtCustomerId").val('');
        $("#txtCustomerName").val('');
        $("#txtManageName").val('');
        $("#txtTaxId").val('');
        $("#txtAddress").val('');
        $("#txtPhoneNumber").val('');
        $("#txtEmail").val('');
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
        this.Getbutton = 2;
        var seft = this;
        //Lấy dữ liệu của khách hàng tương ứng đã chọn
        //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("#tbCustomer tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        if (trSelected.length > 0) {
            //Hiển thị form chi tiết:
            this.showDialogDetail();
            var Id = $(trSelected).children()[0].textContent;
            this.getDataById(Id);
            //3. Gọi api service để lấy dữ liệu chi tiết của khách hàng
            
                $.each(fields, function (index, field) {
                    debugger;
                    var fieldName = $(field).attr('fieldName');
                    var value = obj[fieldName];
                    var td = $(`<td>` + value + `</td>`);
                    $(tr).append(td);
                })
                // Binding dữ liệu lên UI:
                //debugger
                //var trHTML = self.makeTrHTML(obj);
                $('.grid table tbody').append(tr);
                    // binding các thông tin của khách hàng lên form
                    $("#txtCustomerId").val(customer.CustomerId);
                    $("#txtCustomerName").val(customer.CustomerName);
                    $("#txtManageName").val(customer.ManageName);
                    $("#txtTaxId").val(customer.TaxId);
                    $("#txtAddress").val(customer.Address);
                    $("#txtPhoneNumber").val(customer.Phone);
                    $("#txtEmail").val(customer.Email);
                    //chỉnh sửa thông tin trên form

        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
        }
    }
    /**
     * Viết hàm click vao button Xoa
     * Author: TDNAM (30/09/2020)
     * TODO: Cần sửa lại
     * */
    btnDeleteOnClick() {

    }
    /**
     * Xử lý cắt khoảng trắng ở 2 đầu chuỗi nhập vào
     * Author: TDNAM (30/09/2020)
     * @param {string} x
     */
    validateByTrim(x) {
        return x.replace(/^\s+|\s+$/gm, '');
    }

    /**
     * Hàm kiểm tra giá trị Email nhập vào
     * Author: TDNAM (30/09/2020)
     * */
    checkEmail() {
        var email = $('#txtEmail').val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            alert('Bạn phải nhập đúng địa chỉ email hợp lệ.\nExample@gmail.com');
            email.focus;
            return false;
        }
        else {
            return true;
        }
    }
}