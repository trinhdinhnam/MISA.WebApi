
$(document).ready(function () {
    baseJS = new BaseJS();

})
/**
     * Lớp BaseJS
     * Author: TDNAM (29/09/2020)
     * */
class BaseIS {
    constructor(name) {
        try {
            this.getData();
            this.loadData();
        } catch (e) {
            console.log('error');
        }
    }
    getData() {
        this.Data = [];
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
            var data = this.Data;
            var self = this;
            // Đọc dữ liệu:
            $('.grid table tbody').empty();
            $.each(data, function (index, obj) {
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
}