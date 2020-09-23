$(document).ready(function () {
    var customer = new CustomerJS();
})

class CustomerJS {
    constructor() {
        this.loadData();
        this.initEvent();
        var Getbutton;
        var objCustomer;

    }

    //Hàm load dữ liệu khách hảng

    loadData() {
        //lấy dữ liệu khách hàng trên server qua lời gọi api service
        /* *
         * Load dữ liệu bằng các gọi api service
         * Author: TDNAM (23/09/2020)
         * */
        //$('.grid table tbody').empty();
        $.ajax({
            url: "/GetCustomer",
            method: "GET",
            data: "",//tham số truyền qua body request
            contentType: "application/json",
            dataType: "",
            
        }).done(function (response) {
            debugger;
            $('.grid table tbody').empty();
        $.each(response, function (index, item) {
            var trHTML = $(`<tr class="row-selected">
                      <td>`+ item.CustomerId + `</td>
                      <td>`+ item.CustomerName + `</td>
                      <td>`+ item.ManageName + `</td>
                      <td>`+ item.TaxId + `</td>
                      <td>`+ item.Address + `</td>
                      <td>`+ item.Phone + `</td>
                      <td>`+ item.Email + `</td>
                      </tr>`);
            $('.grid table tbody').append(trHTML);
        })

        }).fail(function (response) {
            debugger;

        })
        
    }
    //Hàm khởi tạo các button
    initEvent() {
        $('.toolbar-btn-add').click(this.btnAddOnClick.bind(this));
        $('.btn-cancle').click(this.btnCancleOnClick.bind(this));
        $('.fa-times-circle').click(this.btnCancleOnClick.bind(this));
        $('.btn-store').click(this.btnSaveOnClick.bind(this));
        $('input[required]').blur(this.checkRequired);
        $('.toolbar-btn-edit').click(this.btnEditOnClick.bind(this));
        $('.toolbar-btn-del').click(this.btnDeleteOnClick.bind(this));
        //$('#tbCustomer tbody tr').click(this.rowClickTable);
        $("#tbCustomer").on("click","tbody tr", this.rowClickTable);


        }
    //    //Hàm Thêm khách hàng
    btnAddOnClick() {
        this.Getbutton = 1;
        this.showDialogDetail();
    }
    btnCancleOnClick() {
        this.hideDialogDetail();
    }
    btnSaveOnClick() {
       
        //validate dữ liệu trên form( Kiểm tra dữ liệu nhập trên form có dúng hay không)
        
        var inputRequired = $("[required]");
        var isValid = true;
        var isDuplicate = true;
        /*
         * Kiểm tra mã khách hàng có trùng không trước khi thêm vào
         * Author: TDNAM (22/09/2020)
         * */
        $.ajax({
            url: "/customers",
            method: "GET",
            data: "",
            contentType: "application/json",
            dataType: "",

        }).done(function (response) {
            debugger;
            var cusId = $("#txtCustomerId").val();
            $.each(response, function (index, item) {
                if (item.CustomerId == cusId) {
                    isDuplicate = false;
                }
            })
        }).fail(function (response) {
            debugger;
        })
        
        /*
         * Kiểm tra các trường bắt buộc không được rỗng
         * Author: TDNAM (21/09/2020)
         * */
        $.each(inputRequired, function (index, input) {
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("required-error")) {
                isValid = false;
            }
        })

        //Thu thập dữ liệu trên form dialog
        if (isValid) {
            if (this.Getbutton == 1) {
                if (isDuplicate) {
                    var customer = {};
                    var seft = this;
                    customer.CustomerId = $("#txtCustomerId").val();
                    customer.CustomerName = $("#txtCustomerName").val();
                    customer.ManageName = $("#txtManageName").val();
                    customer.TaxId = $("#txtTaxId").val();
                    customer.Address = $("#txtAddress").val();
                    customer.Phone = $("#txtPhoneNumber").val();
                    customer.Email = $("#txtEmail").val();
                    //Lưu trữ thông tin trên form vào database
                    debugger;
                    $.ajax({
                        url: "",
                        url: "/AddCustomer",
                        method: "POST",
                        data: JSON.stringify(customer),//tham số truyền qua body request
                        contentType: "application/json",
                        dataType: ""
                    }).done(function (res) {
                        //debugger;
                        seft.loadData();
                        seft.Refresh();
                        seft.hideDialogDetail();
                    }).fail(function (res) {
                        //debugger;
                     })
                    //customers.push(customer);
                    //load lại form
                }else {
                    alert('Mã khách hàng đã trùng lặp, vui lòng nhập lại!');
                    $('#txtCustomerId').val('');
                    $('#txtCustomerId').focus();
                }
                }
                else if (this.Getbutton == 2) {
                    var index = $("#txtCustomerId").val();
                    var objIndex = customers.findIndex((obj => obj.CustomerId == index));
                    customers[objIndex].CustomerName = $("#txtCustomerName").val();
                    customers[objIndex].ManageName = $("#txtManageName").val();
                    customers[objIndex].TaxId = $("#txtTaxId").val();
                    customers[objIndex].Address = $("#txtAddress").val();
                    customers[objIndex].Phone = $("#txtPhoneNumber").val();
                    customers[objIndex].Email = $("#txtEmail").val();
                this.loadData();
                this.Refresh();
                this.hideDialogDetail();                }
            }
       
       
    }

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
     * Author: TDNAM (21/09/2020)
     * */
    showDialogDetail() {
        $('.modal').show();
        $('.dialog-form').show();
        $("#txtCustomerId").focus();

    }
    /**
     * Ẩn dialog chi tiết
     * Author: TDNAM (21/09/2020)
     * */
    hideDialogDetail() {
        $('.modal').hide();
        $('.dialog-form').hide();
    }

    /**
     * Refresh lại form dialog sau khi thêm, sửa thành công
     * Author: TDNAM (21/09/2020)
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
     * Author: TDNAM (22/09/2020)
     * */

    rowClickTable() {
        var customerEdit = {};
        customerEdit.CustomerId = $(this).closest('tr').find('td:nth-child(1)').text();
        customerEdit.CustomerName = $(this).closest('tr').find('td:nth-child(2)').text();
        customerEdit.ManageName = $(this).closest('tr').find('td:nth-child(3)').text();
        customerEdit.TaxId = $(this).closest('tr').find('td:nth-child(4)').text();
        customerEdit.Address = $(this).closest('tr').find('td:nth-child(5)').text();
        customerEdit.Phone = $(this).closest('tr').find('td:nth-child(6)').text();
        customerEdit.Email = $(this).closest('tr').find('td:nth-child(7)').text();
        return customerEdit;
    }
    objCustomer = this.rowClickTable;
    //btnEditOnClick() {
    //    this.Getbutton = 2;
    //    this.showDialogDetail();

    //    $("#tbCustomer tbody tr").on("click", function () {
    //        var customerEdit = {};
    //        customerEdit.CustomerId = $(this).closest('tr').find('td:nth-child(1)').text();
    //        customerEdit.CustomerName = $(this).closest('tr').find('td:nth-child(2)').text();
    //        customerEdit.ManageName = $(this).closest('tr').find('td:nth-child(3)').text();
    //        customerEdit.TaxId = $(this).closest('tr').find('td:nth-child(4)').text();
    //        customerEdit.Address = $(this).closest('tr').find('td:nth-child(5)').text();
    //        customerEdit.Phone = $(this).closest('tr').find('td:nth-child(6)').text();
    //        customerEdit.Email = $(this).closest('tr').find('td:nth-child(7)').text();
    //            /*e.preventDefault();*/ //==> preventDefault() không load lại form nếu làm việc với form
    //            $("#txtCustomerId").val(customerEdit.CustomerId);
    //            $("#txtCustomerName").val(customerEdit.CustomerName);
    //            $("#txtManageName").val(customerEdit.ManageName);
    //            $("#txtTaxId").val(customerEdit.TaxId);
    //            $("#txtAddress").val(customerEdit.Address);
    //            $("#txtPhoneNumber").val(customerEdit.Phone);
    //            $("#txtEmail").val(customerEdit.Email);
    //    });
    //}

    btnEditOnClick() {
        this.Getbutton = 2;
        //Lấy dữ liệu của khách hàng tương ứng đã chọn
            //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("#tbCustomer tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        if (trSelected.length > 0) {
            //Hiển thị form chi tiết:
            this.showDialogDetail();
            var customerId = $(trSelected).children()[0].textContent

        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
        }
            //3. Gọi api service để lấy dữ liệu chi tiết của khách hàng
        // binding các thông tin của khách hàng lên form

        //chỉnh sửa thông tin trên form

        //Thực hiện lưu dữ liệu sau khi chỉnh sửa
        $("#txtCustomerId").val(this.objCustomer.CustomerId);
        $("#txtCustomerName").val(this.objCustomer.CustomerName);
        $("#txtManageName").val(this.objCustomer.ManageName);
        $("#txtTaxId").val(this.objCustomer.TaxId);
        $("#txtAddress").val(this.objCustomer.Address);
        $("#txtPhoneNumber").val(this.objCustomer.Phone);
        $("#txtEmail").val(this.objCustomer.Email);
    }

    btnDeleteOnClick() {
        //$('#tbCustomer tbody tr').click(function (e) {
        //    var cusId = $(this).closest('tr').find('td:nth-child(1)').text();
        //    $.each(customers, function (index, item) {
        //        if (item.CustomerId == cusId) {
        //            delete this.customers[item]; // thì xóa
        //        }
        //    })

        //})
    }
}


var customers = [
    {
        CustomerId: "KH9492394",
        CustomerName: "Phạm Minh Sang",
        ManageName: "Viettel",
        TaxId: "28183823",
        Address: "Thường Tín, Hà Nội",
        Phone: "0324004935",
        Email: "sang2378@gmail.com"
    },
    {
        CustomerId: "KH838284",
        CustomerName: "Hoàng Phi Hùng",
        ManageName: "Viettel",
        TaxId: "94939544",
        Address: "Bách khoa, Hà Nội",
        Phone: "05456567565",
        Email: "hung37273@gmail.com"
    },
    {
        CustomerId: "KH74737434",
        CustomerName: "Lưu Văn Hoàng",
        ManageName: "SamSung",
        TaxId: "534545666",
        Address: "Lê Thanh Nghị, Hà Nội",
        Phone: "32434",
        Email: "hoang13@gmail.com"
    },
    {
        CustomerId: "KH848384",
        CustomerName: "Đỗ Trung Kiên",
        ManageName: "BSS",
        TaxId: "343544545",
        Address: "Xã Đàn, Hà Nội",
        Phone: "545454546",
        Email: "kien38284@gmail.com"
    },
    {
        CustomerId: "KH162661",
        CustomerName: "Phạm Minh Sang",
        ManageName: "Viettel",
        TaxId: "28183823",
        Address: "Thường Tín, Hà Nội",
        Phone: "0324004935",
        Email: "sang2378@gmail.com"
    },
    {
        CustomerId: "KH8938284",
        CustomerName: "Hoàng Phi Hùng",
        ManageName: "Viettel",
        TaxId: "94939544",
        Address: "Bách khoa, Hà Nội",
        Phone: "05456567565",
        Email: "hung37273@gmail.com"
    },
    {
        CustomerId: "KH737434",
        CustomerName: "Lưu Văn Hoàng",
        ManageName: "SamSung",
        TaxId: "534545666",
        Address: "Lê Thanh Nghị, Hà Nội",
        Phone: "32434",
        Email: "hoang13@gmail.com"
    },
    {
        CustomerId: "KH8148384",
        CustomerName: "Đỗ Trung Kiên",
        ManageName: "BSS",
        TaxId: "343544545",
        Address: "Xã Đàn, Hà Nội",
        Phone: "545454546",
        Email: "kien38284@gmail.com"
    },
]

    