$(document).ready(function () {
    employee = new EmployeeJS();
})

/**
 * Class Quản lý function cho trang Customer
 * Author: TDNAM (29/09/2020)
 * GOTO: Cần sửa lại
 * */
class EmployeeJS extends BaseJS {
    constructor() {

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
     *  Hàm InitEvent kế thừa lớp BaseJS
     * Author: TDNAM (05/10/2020)
     * */

    initEvent() {
        super.initEvent();
        $('input[required]').blur(this.validateRequired.bind(this));
    }

    /**
     * Hàm Validate bắt buộc nhập
     * Author: TDNAM (05/10/2020)
     * @param {object} sender
     * */
    validateRequired(sender) {
        //Nếu chưa nhập thì set border màu đỏ và hiển thị thông báo
        validData.validateRequired(sender.currentTarget);
    }
    /**
     *  Hàm cất data của Customer khi them
     *  Author: TDNAM (05/10/2020)
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
     * Hàm cấp nhật dữ liệu củ khách hàng
     * Author: TDNAM (05/10/2020)
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
     * Author: TDNAM (05/10/2020)
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
     * Author: TDNAM (05/10/2020)
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

}

