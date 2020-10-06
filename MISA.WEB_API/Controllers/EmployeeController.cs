using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.WEB_API.Models;

namespace MISA.WEB_API.Controllers
{
    [RoutePrefix("employees")]

    public class EmployeeController : ApiController
    {
        // GET: employees
        [Route("")]
        public IEnumerable<Employee> Get()
        {
            return Employee.EmployeeList;
        }

        // GET: api/Employee/5
        [Route("{employeeId}")]
        public object Get(string employeeId)
        {
            var employees = Employee.EmployeeList.Where(e => e.EmployeeId == employeeId).FirstOrDefault();

            return employees;
        }

        // POST: api/Employee
        [Route("add")]
        public bool Post([FromBody]Employee employee)
        {
            Employee.EmployeeList.Add(employee);
            return true;
        }

        // PUT: api/Employee/5
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
            employeeEdit.PositionName = employee.PositionName;
            employeeEdit.DepartmentName = employee.DepartmentName;
            employeeEdit.Salary = employee.Salary;
            employeeEdit.WorkStatus = employee.WorkStatus;

            return true;
            
        }

        // DELETE: api/Employee/5
        [Route("delete/{employeeId}")]

        public bool Delete(string employeeId)
        {
            var employeeDel = Employee.EmployeeList.Where(e => e.EmployeeId == employeeId).FirstOrDefault();
            Employee.EmployeeList.Remove(employeeDel);
            return true;
        }
    }
}
