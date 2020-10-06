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
     *  Hàm lấy data của Employee
     * Author: TDNAM (06/10/2020)
     * */
    getData() {
        try {
            var self = this;
            //$('.grid table tbody').empty();
            $.ajax({
                url: "/employees",
                method: "GET",
                data: "",//tham số truyền qua body request
                contentType: "application/json",
                dataType: "",
                async: false,

            }).done(function (employee) {

                debugger;
                self.Data = employee;
                console.log(self.Data);

            }).fail(function (employee) {
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
     *  Hàm cất data của Employee khi them
     *  Author: TDNAM (06/10/2020)
     * @param {object} employee
     * @param {string} method
     */
    postData(employee, method) {
        //
        try {
            var self = this;
            $.ajax({
                url: "/employees/add",
                method: method,
                data: JSON.stringify(employee),//tham số truyền qua body request
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
     * @param {object} empEdit
     * @param {string} method
     */
    putData(empEdit, method) {
        // Goi service de cap nhat du lieu khach hang
        try {
            var self = this;
            $.ajax({
                url: "/employees/edit",
                method: method,
                data: JSON.stringify(empEdit),//tham số truyền qua body request
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
     * Ham lay du lieu Nhân viên theo Id
     * Author: TDNAM (06/10/2020)
     * @param {string} Id
     */
    getDataById(Id) {
        debugger
        try {
            var self = this;
            $.ajax({
                url: "/employees/" + Id,
                method: "GET",
                data: "",//tham số truyền qua body request
                contentType: "application/json",
                dataType: "json",
                async: false,

            }).done(function (employee) {
                debugger;
                self.DataById = employee;
                console.log(self.Data);

            }).fail(function (employee) {
                debugger;
            })
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Ham gọi service đê xóa nhân viên theo Id
     * Author: TDNAM (06/10/2020)
     * @param {string} Id
     */
    deleteData(Id) {
        try {
            var self = this;

            $.ajax({
                url: "/employees/delete/" + Id,
                method: "DELETE",

            }).done(function (employee) {
                debugger;
                if (employee) {
                    //Xóa thành công sẽ load lại form
                    self.getData();

                    self.loadData();
                }
                else {
                    alert('Không tồn tại mã khách hàng');
                }
            }).fail(function (employee) {
                //debugger;
            })
        } catch (e) {
            console.log('error');
        }
    }

}

