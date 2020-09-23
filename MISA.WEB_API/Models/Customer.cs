using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.WEB_API.Models
{
    public class Customer
    {
        public static List<Customer> CustomerList = new List<Customer>()
        {
            new Customer(){CustomerId= "KH9492394", CustomerName= "Trịnh Đình Nam",ManageName= "MISA",TaxId= "94939544",Address= "Thanh Nhàn, Hà Nội",Phone= "0395699933",Email= "nam16898@gmail.com" },
            new Customer(){CustomerId= "KH8438453", CustomerName= "Phạm Minh Sang",ManageName= "Viettel",TaxId= "28183823",Address= "Thường Tín, Hà Nội",Phone= "0324004935",Email= "sang2378@gmail.com" },
            new Customer(){CustomerId= "KH8589943", CustomerName= "Hoàng Phi Hùng",ManageName= "Viettel",TaxId= "03209595",Address= "Hai Bà Trưng, Hà Nội",Phone= "0438855663",Email= "hung123@gmail.com" },
            new Customer(){CustomerId= "KH6264644", CustomerName= "Mai Thái Sơn",ManageName= "Multimedia ThuDo",TaxId= "050495543",Address= "Hồ Linh Đàm, Hà Nội",Phone= "0948377534",Email= "son213@gmail.com" },
            new Customer(){CustomerId= "KH6376467", CustomerName= "Lưu Văn Hoàng",ManageName= "MISA",TaxId= "0493995553",Address= "Lê Thanh Nghị, Hà Nội",Phone= "0348823484",Email= "hoang33@gmail.com" },
            new Customer(){CustomerId= "KH1282343", CustomerName= "Hoàng Thanh Phương",ManageName= "Viettel",TaxId= "9493944234",Address= "Thường Tín, Hà Nội",Phone= "05656673",Email= "phuong32@gmail.com" },


        };
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerId { get; set; }
        /// <summary>
        /// Tên khách hàng
        /// </summary>
        public string CustomerName { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string ManageName { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxId { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }


    }
}