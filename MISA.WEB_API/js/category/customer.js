$(document).ready(function () {
    customer = new CustomerJS();
})

/**
 * Class Quản lý function cho trang Customer
 * Author: TDNAM (29/09/2020)
 * GOTO: Cần sửa lại
 * */
class CustomerJS extends BaseJS {
    constructor() {

        var Getbutton = null;
        //this.loadData();
        //this.initEvent();
        super();
    }
    /** 
     *  Hàm lấy data của Customer
     * Author: TDNAM (29/09/2020)
     * */
    getData() {
        try {
            var self = this;
            //$('.grid table tbody').empty();
            $.ajax({
                url: "/customers",
                method: "GET",
                data: "",//tham số truyền qua body request
                contentType: "application/json",
                dataType: "",
                async: false,

            }).done(function (customer) {

                debugger;
                self.Data = customer;
                console.log(self.Data);

            }).fail(function (customer) {
                debugger;

            })
        } catch (e) {
            console.log('error');

        }

    }
    /**
     *  Hàm cất data của Customer khi them
     * @param {object} customer
     * @param {string} method
     */
    postData(customer, method) {
        //
        try {
            var self = this;
            $.ajax({
                url: "/customers/add",
                method: method,
                data: JSON.stringify(customer),//tham số truyền qua body request
                contentType: "application/json",
                dataType: "json",
                async: false,
            }).done(function (res) {
                debugger;
                //load lại form
                self.getData();
                self.loadData();
                self.Refresh();
                self.hideDialogDetail();
                self.Getbutton = null;
                debugger;
            }).fail(function (res) {
                debugger;
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 
     * @param {object} customer
     * @param {string} method
     */
    putData(cusEdit, method) {
        // Goi service de cap nhat du lieu khach hang
        try {
            var self = this;
            $.ajax({
                url: "/customers/edit",
                method: method,
                data: JSON.stringify(cusEdit),//tham số truyền qua body request
                contentType: "application/json",
                dataType: "json",
                async: false,

            }).done(function (res) {
                //debugger;
                if (res) {
                    self.getData();
                    self.loadData();
                    self.Refresh();
                    self.hideDialogDetail();
                    self.Getbutton = null;
                }

            }).fail(function (res) {
                //debugger;
            })
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Ham lay du lieu khach hang theo Id
     * @param {string} Id
     */
    getDataById(Id) {
        debugger
        try {
            var self = this;
            $.ajax({
                url: "/customers/" + Id,
                method: "GET",
                data: "",//tham số truyền qua body request
                contentType: "application/json",
                dataType: "json",
                async: false,

            }).done(function (customer) {
                debugger;
                self.DataById = customer;
                console.log(self.Data);

            }).fail(function (customer) {
                debugger;
            })
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Ham gọi service đê xóa khach hang theo Id
     * @param {string} Id
     */
    deleteData(Id) {
        try {


            var self = this;

            $.ajax({
                url: "/customers/delete/" + Id,
                method: "DELETE",

            }).done(function (customer) {
                debugger;
                if (customer) {
                    //Xóa thành công sẽ load lại form
                    self.getData();

                    self.loadData();
                }
                else {
                    alert('Không tồn tại mã khách hàng');
                }
            }).fail(function (customer) {
                //debugger;
            })
        } catch (e) {
            console.log('error');
        }
    }
    //Hàm load dữ liệu khách hảng

    //loadData() {
    //    //lấy dữ liệu khách hàng trên server qua lời gọi api service
    //    /* *
    //     * Load dữ liệu bằng các gọi api service
    //     * Author: TDNAM (23/09/2020)
    //     * */
    //    //$('.grid table tbody').empty();
    //    $.ajax({
    //        url: "/customers",
    //        method: "GET",
    //        data: "",//tham số truyền qua body request
    //        contentType: "application/json",
    //        dataType: "",

    //    }).done(function (response) {
    //        debugger;
    //        $('.grid table tbody').empty();
    //    $.each(response, function (index, item) {
    //        var trHTML = $(`<tr>
    //                  <td>`+ item.CustomerId + `</td>
    //                  <td>`+ item.CustomerName + `</td>
    //                  <td>`+ item.ManageName + `</td>
    //                  <td>`+ item.TaxId + `</td>
    //                  <td>`+ item.Address + `</td>
    //                  <td>`+ item.Phone + `</td>
    //                  <td>`+ item.Email + `</td>
    //                  </tr>`);
    //        $('.grid table tbody').append(trHTML);
    //    })

    //    }).fail(function (response) {
    //        debugger;

    //    })

    //}
    //Hàm khởi tạo các button
    // initEvent() {
    //     $('.toolbar-btn-add').click(this.btnAddOnClick.bind(this));
    //     $('.btn-cancle').click(this.btnCancleOnClick.bind(this));
    //     $('.fa-times-circle').click(this.btnCancleOnClick.bind(this));
    //     $('.btn-store').click(this.btnSaveOnClick.bind(this));
    //     $('input[required]').blur(this.checkRequired);
    //     $('.toolbar-btn-edit').click(this.btnEditOnClick.bind(this));
    //     $("#tbCustomer").on("click", "tbody tr", this.rowClickTable);

    //     $('.toolbar-btn-del').click(this.btnDeleteOnClick.bind(this));
    //     //$('#tbCustomer tbody tr').click(this.rowClickTable);
    //     $("#tbCustomer").on("click","tbody tr", this.rowClickTable);


    //     }
    //    //Hàm Thêm khách hàng
    // btnAddOnClick() {
    //     this.Getbutton = 1;
    //     this.showDialogDetail();
    // }
    // //Hàm Sửa khách hàng
    // btnEditOnClick() {
    //     this.Getbutton = 2;
    //     var seft = this;
    //     //Lấy dữ liệu của khách hàng tương ứng đã chọn
    //     //1. Xác định khách hàng nào dã được chọn
    //     var trSelected = $("#tbCustomer tr.row-selected");
    //     //2. Lấy thông tin theo mã khách hàng
    //     if (trSelected.length > 0) {
    //         //Hiển thị form chi tiết:
    //         this.showDialogDetail();
    //         var customerId = $(trSelected).children()[0].textContent
    //         //3. Gọi api service để lấy dữ liệu chi tiết của khách hàng
    //         $.ajax({
    //             url: "",
    //             url: "/customers/" + customerId,
    //             method: "GET",

    //         }).done(function (customer) {
    //             debugger;
    //             if (!customer) {
    //                 alert('Không có khách hàng với mã tương đương');
    //             } else {
    //                 // binding các thông tin của khách hàng lên form
    //                 $("#txtCustomerId").val(customer.CustomerId);
    //                 $("#txtCustomerName").val(customer.CustomerName);
    //                 $("#txtManageName").val(customer.ManageName);
    //                 $("#txtTaxId").val(customer.TaxId);
    //                 $("#txtAddress").val(customer.Address);
    //                 $("#txtPhoneNumber").val(customer.Phone);
    //                 $("#txtEmail").val(customer.Email);
    //                 //chỉnh sửa thông tin trên form

    //             }
    //         }).fail(function (customer) {
    //             //debugger;
    //         })

    //     } else {
    //         alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
    //     }


    // }
    // btnCancleOnClick() {
    //     this.hideDialogDetail();
    // }
    // /*
    //  * Thực hiện cất dữ liệu vào List
    //  * Author: TDNAM (23/09/2020)
    //  * */
    // btnSaveOnClick() {

    //     //validate dữ liệu trên form( Kiểm tra dữ liệu nhập trên form có dúng hay không)
    //     var inputRequired = $("[required]");
    //     var isValid = true;
    //     var isDuplicate = true;
    //     var seft = this;

    //     /*
    //      * Kiểm tra mã khách hàng có trùng không trước khi thêm vào
    //      * Author: TDNAM (22/09/2020)
    //      * */
    //     var customerId = $("#txtCustomerId").val();
    //     $.ajax({
    //         url: "/customers/" + customerId,
    //         method: "GET",
    //         data: "",//tham số truyền qua body request
    //         contentType: "application/json",
    //         dataType: "json"
    //     }).done(function (res) {
    //         if (res) {
    //             isDuplicate = false;
    //         }
    //     }).fail(function (res) {
    //         debugger;
    //     })

    //     /*
    //      * Kiểm tra các trường bắt buộc không được rỗng
    //      * Author: TDNAM (21/09/2020)
    //      * */
    //     $.each(inputRequired, function (index, input) {
    //         var valid = $(input).trigger("blur");
    //         if (isValid && valid.hasClass("required-error")) {
    //             isValid = false;
    //         }
    //     })

    //     //Thu thập dữ liệu trên form dialog
    //     if (isValid) {
    //         //thêm dữ liệu
    //         if (seft.Getbutton==1) {
    //             if (isDuplicate) {
    //                 var customer = {};
    //                 customer.CustomerId = $("#txtCustomerId").val();
    //                 customer.CustomerName = $("#txtCustomerName").val();
    //                 customer.ManageName = $("#txtManageName").val();
    //                 customer.TaxId = $("#txtTaxId").val();
    //                 customer.Address = $("#txtAddress").val();
    //                 customer.Phone = $("#txtPhoneNumber").val();
    //                 customer.Email = $("#txtEmail").val();
    //                 //Lưu trữ thông tin trên form vào database
    //                 debugger;
    //                 $.ajax({
    //                     url: "/customers/add",
    //                     method: "POST",
    //                     data: JSON.stringify(customer),//tham số truyền qua body request
    //                     contentType: "application/json",
    //                     dataType: "json"
    //                 }).done(function (res) {
    //                     debugger;
    //                     //load lại form
    //                     seft.loadData();
    //                     seft.Refresh();
    //                     seft.hideDialogDetail();
    //                     self.Getbutton = null;
    //                     debugger;
    //                 }).fail(function (res) {
    //                     debugger;
    //                  })
    //                 //customers.push(customer);
    //             }else {
    //                 alert('Mã khách hàng đã trùng lặp, vui lòng nhập lại!');
    //                 $('#txtCustomerId').val('');
    //                 $('#txtCustomerId').focus();
    //             }
    //         }

    //         //Sửa dữ liệu
    //         else if (seft.Getbutton==2) {
    //             //Thực hiện lưu dữ liệu sau khi chỉnh sửa
    //             //1. Thu thập thông tin đã chỉnh sửa.
    //             var cusEdit = {};
    //             cusEdit.CustomerId = $("#txtCustomerId").val();
    //             cusEdit.CustomerName = $("#txtCustomerName").val();
    //             cusEdit.ManageName = $("#txtManageName").val();
    //             cusEdit.TaxId = $("#txtTaxId").val();
    //             cusEdit.Address = $("#txtAddress").val();
    //             cusEdit.Phone = $("#txtPhoneNumber").val();
    //             cusEdit.Email = $("#txtEmail").val();

    //             //2. Gọi Api service thực hiện cất dữu liệu
    //             $.ajax({
    //                 url: "/customers/edit",
    //                 method: "PUT",
    //                 data: JSON.stringify(cusEdit),//tham số truyền qua body request
    //                 contentType: "application/json",
    //                 dataType: "json"
    //             }).done(function (res) {
    //                 //debugger;
    //                 if (res) {
    //                     seft.loadData();
    //                     seft.Refresh();
    //                     seft.hideDialogDetail();
    //                     self.Getbutton = null;
    //                 }

    //             }).fail(function (res) {
    //                 //debugger;
    //             })
    //         }
    //     }


    // }
    ///**
    // * Hàm kiểm tra validate các trường bắt buộc trên form
    // * Author: TDNAM (21/09/2020)
    // * */
    // checkRequired() {
    //     var value = this.value;

    //     if (!value) {
    //         $(this).addClass("required-error");
    //         $(this).attr("title", "Bạn phải nhập thông tin này!");
    //     } else {
    //         $(this).removeClass("required-error");
    //         $(this).removeAttr("title");
    //     }

    // }
    // /**
    //  * Hiển thị dialog chi tiết
    //  * Author: TDNAM (21/09/2020)
    //  * */
    // showDialogDetail() {
    //     //moi khi mo form dialog phai clean het cac gia tri cu tren form
    //     this.Refresh();
    //     $('.modal').show();
    //     $('.dialog-form').show();
    //     $("#txtCustomerId").focus();
    // }
    // /**
    //  * Ẩn dialog chi tiết
    //  * Author: TDNAM (21/09/2020)
    //  * */
    // hideDialogDetail() {
    //     $('.modal').hide();
    //     $('.dialog-form').hide();
    // }

    // /**
    //  * Refresh lại form dialog sau khi thêm, sửa thành công
    //  * Author: TDNAM (21/09/2020)
    //  * */

    // Refresh() {
    //     $("#txtCustomerId").val('');
    //     $("#txtCustomerName").val('');
    //     $("#txtManageName").val('');
    //     $("#txtTaxId").val('');
    //     $("#txtAddress").val('');
    //     $("#txtPhoneNumber").val('');
    //     $("#txtEmail").val('');
    // }
    // /**
    //  * Viết hàm lấy đối tượng khi click vào bảng
    //  * Author: TDNAM (22/09/2020)
    //  * */

    // rowClickTable(sender) {
    //     this.classList.add("row-selected");
    //     $(this).siblings().removeClass("row-selected");
    // }
    // btnDeleteOnClick() {
    //     var seft = this;

    //     //Lấy dữ liệu của khách hàng tương ứng đã chọn
    //     //1. Xác định khách hàng nào dã được chọn
    //     var trSelected = $("#tbCustomer tr.row-selected");
    //     //2. Lấy thông tin theo mã khách hàng
    //     if (trSelected.length ) {
    //         //Hiển thị form chi tiết:
    //         var customerId = $(trSelected).children()[0].textContent
    //         //3. Gọi api service để lấy dữ liệu chi tiết của khách hàng
    //         if (customerId) {
    //             $.ajax({
    //                 url: "/customers/delete/" + customerId,
    //                 method: "DELETE",

    //             }).done(function (customer) {
    //                 debugger;
    //                 if (customer) {
    //                     //Xóa thành công sẽ load lại form
    //                     seft.loadData();
    //                 }
    //                 else {
    //                     alert('Không tồn tại mã khách hàng');
    //                 }
    //             }).fail(function (customer) {
    //                 //debugger;
    //             })
    //         }
    //     } else {
    //         alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
    //     }
    // }
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

