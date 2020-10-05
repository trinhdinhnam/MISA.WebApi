/**--------------------------------------
 * Đối tượng js chứa tất cả các hàm sửu dụng
 * Author: TDNAM(05/10/2020)
 * --------------------------------------*/

var commonJS = {
    /**
     * Hàm format tiền
     * Author: TDNAM(05/10/2020)
     * @param {number} money
     */
    formatMoney(money) {
        return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    },
    /**
     * Hàm format ngày giò
     * Author: TDNAM(05/10/2020)
     * @param {date} date
     */
    formatDate(date) {
        let format_date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return format_date;
    },

}
Number.prototype.formatMoney = function () {
    return this.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

