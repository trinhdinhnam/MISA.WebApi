using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.WEB_API.Models;
using MySql.Data.MySqlClient;

namespace MISA.WEB_API.Controllers
{
    [RoutePrefix("employees")]

    public class EmployeeController : ApiController
    {
        // GET: employees
        /**
         * Controller lấy ra danh sách nhân viên
         * Author: TDNAM (06/10/2020)
         * */
        [Route("")]
        public IEnumerable<Employee> Get()
        {
            var employees = new List<Employee>();
            string connectionString = "Server=35.194.166.58;Port=3306;Database=MISACukCuk_F09_TDNAM;Uid=nvmanh;Pwd=12345678@Abc;";
            //Khởi tạo đối tượng MySql Connection
            MySqlConnection mysqlConnection = new MySqlConnection(connectionString);

            //Đối tượng Mysql Command - cho phép thao tác với CSDL
            MySqlCommand mySqlCommand = mysqlConnection.CreateCommand();
            mySqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            //Khai báo câu truy vấn để lấy ra danh sách nhân viên

            mySqlCommand.CommandText = "Proc_GetEmployees";
            //Mở kết nối tới Database
            mysqlConnection.Open();
            //Thực thi công việc với Database:
            MySqlDataReader mySqlDataReader = mySqlCommand.ExecuteReader();

            //Xử lý dữ liệu trả về:

            while (mySqlDataReader.Read())
            {
                var employee = new Employee();
                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    //Lấy tên cột dữ liệu đang đọc:
                    var colName = mySqlDataReader.GetName(i);
                    //Lấy giá trị của Cell đang đọc:
                    var value = mySqlDataReader.GetValue(i);
                    //Lấy ra property giống với tên cột được khai báo ở trên:
                    var property = employee.GetType().GetProperty(colName);
                    //Nếu có property tương ứng với tên cột thì gán dữ liệu tương ứng:
                    if (property != null && value != DBNull.Value)
                    {
                        property.SetValue(employee, value);
                    }
                }

                //Thêm đối tượng nhân viên vừa build được vào list
                employees.Add(employee);
            }

            //Đóng kết nối:
            mysqlConnection.Close();
            return employees;
        }

        // GET: api/Employee/5
        /**
         * Controller lấy ra nhân viên theo mã nhân
         * Author: TDNAM (06/10/2020)
         * */
        [Route("{employeeId}")]
        public object Get(string employeeId)
        {

            return true;
        }

        // POST: api/Employee
        /**
         * Controller thêm dữ liệu nhân viên
         * Author: TDNAM (06/10/2020)
         * TODO: Cần tiếp tục hàm thêm nhân viên
         * */
        [Route("add")]
        public bool Post([FromBody]Employee employee)
        {
            var employees = new List<Employee>();
            string connectionString = "Server=35.194.166.58;Port=3306;Database=MISACukCuk_F09_TDNAM;Uid=nvmanh;Pwd=12345678@Abc;";
            //Khởi tạo đối tượng MySql Connection
            MySqlConnection mysqlConnection = new MySqlConnection(connectionString);

            //Đối tượng Mysql Command - cho phép thao tác với CSDL
            MySqlCommand mySqlCommand = mysqlConnection.CreateCommand();
            mySqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            //Khai báo câu truy vấn để lấy ra danh sách nhân viên

            mySqlCommand.CommandText = "Proc_InsertEmployee";

            //Gán giá trị đầu vào cho các tham số trong store

            mySqlCommand.Parameters.AddWithValue("@EmployeeId", Guid.NewGuid());
            mySqlCommand.Parameters.AddWithValue("@EmployeeId", Guid.NewGuid());
            //Mở kết nối tới Database
            mysqlConnection.Open(); 

            return true;
        }

        // PUT: api/Employee/5
        /**
         * Controller cập nhật thông tin nhân viên
         * Author: TDNAM (06/10/2020)
         * TODO: Cần chỉnh sửa lại controller cập  nhập nhân viên
         * */
        [Route("edit")]

        public bool Put([FromBody]Employee employee)
        {
            // Xac định đối tượng employee thực hiện chỉnh sửa thông tin trong List
            var employeeEdit = Employee.EmployeeList.Where(e => e.EmployeeId == employee.EmployeeId).FirstOrDefault();
            //Chỉnh sửa thông mới

            //Cập nhật lại dữ liệu employee
            employeeEdit.EmployeeId = employee.EmployeeId;
            employeeEdit.EmployeeName = employee.EmployeeName;
            employeeEdit.Gender = employee.Gender;
            employeeEdit.DateOfBirth = employee.DateOfBirth;
            employeeEdit.Phone = employee.Phone;
            employeeEdit.Email = employee.Email;
            employeeEdit.PossitionName = employee.PossitionName;
            employeeEdit.DepartmentName = employee.DepartmentName;
            employeeEdit.Salary = employee.Salary;
            employeeEdit.WorkStatus = employee.WorkStatus;

            return true;
            
        }

        // DELETE: api/Employee/5
        /**
         * Controller xóa nhân viên theo mã nhân viên
         * Author: TDNAM (06/10/2020)
         * TODO: Cần chỉnh sửa hàm xóa nhân viên
         * */
        [Route("delete/{employeeId}")]
        public bool Delete(string employeeId)
        {
            return true;
        }
    }
}
