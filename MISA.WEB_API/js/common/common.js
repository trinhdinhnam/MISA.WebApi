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
        let format_date = date.slice(0, 10);
        return format_date;
    },

    /**
     * Hàm format kiểu giới tính sang dạng tring
     * Author: TDNAM (06/10/2020)
     * @param {number} gender
     */
    formatGender(gender) {
        var value = null;
        switch (gender) {
            case 1:
                value = "Nam";
                break;
            case 0:
                value = "Nữ";
                break;
        }

        return value;
    },
    /**
     * 
     * Hàm format tên phòng ban sang dnagj string
     * Author: TDNAM (06/10/2020)
     * @param {number} departmentName
     */
    formatDepartmentName(departmentName) {
        var value = null;

        switch (departmentName) {
            case 1:
                value = "Phòng đào tạo";
                break;
            case 2:
                value = "Phòng nghiên cứu";
                break;
            case 3:
                value = "Phòng nhân sự";
                break;
        }
        return value;
    },

    /**
     * Hàm format trạng thái làm việc
     * Author: TDNAM (06/10/2020)
     * @param {number} workStatus
     */
    formatWorkStatus(workStatus) {
        var value = null;

        switch (workStatus) {
            case 1:
                value = "Đang làm việc";
                break;
            case 2:
                value = "Đã nghỉ làm";
                break;
        }
        return value;
    }

    

}

