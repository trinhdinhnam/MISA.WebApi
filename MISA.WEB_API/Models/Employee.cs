using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.WEB_API.Models
{
    public class Employee
    {
        public static List<Employee> CustomerList = new List<Employee>()
        {
            new Employee(){EmployeeId= "NV00001", EmployeeName= "Trịnh Đình Nam", Gender=1,DateOfBirth=new DateTime(1998,8,16),Phone="0395699933",Email="trinhnam16898@gmail.com",PositionName="Giám đốc",DepartmentName= 1, Salary= 20000000,WorkStatus=1},
            new Employee(){EmployeeId= "NV00002", EmployeeName= "Phạm Minh Sang", Gender=1,DateOfBirth=new DateTime(1998,7,12),Phone="0384885856",Email="sang123@gmail.com",PositionName="Phó Giám đốc",DepartmentName= 2, Salary= 130000000,WorkStatus=1},
            new Employee(){EmployeeId= "NV00003", EmployeeName= "Hoàng Phi Hùng", Gender=1,DateOfBirth=new DateTime(1998,9,17),Phone="0949395953",Email="hung123@gmail.com",PositionName="Trưởng phòng kỹ thuật",DepartmentName= 3, Salary= 12000000,WorkStatus=1},
            new Employee(){EmployeeId= "NV00004", EmployeeName= "Đặng Thị Thư", Gender=0,DateOfBirth=new DateTime(1998,3,12),Phone="04938585896",Email="thu123@gmail.com",PositionName="Giám đốc nhân sự",DepartmentName= 1, Salary= 210000000,WorkStatus=0},

        };
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime DateOfBirth { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Vị trí
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public int DepartmentName { get; set; }

        /// <summary>
        /// Số lương
        /// </summary>
        public Double Salary { get; set; }

        /// <summary>
        /// Trạng thái làm việc
        /// </summary>
        public int WorkStatus { get; set; }
    }
}