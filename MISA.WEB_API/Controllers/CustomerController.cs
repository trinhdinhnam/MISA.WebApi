using MISA.WEB_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.WEB_API.Controllers
{
    [RoutePrefix("customers")]
    public class CustomerController : ApiController
    {
        // GET: api/Customer/
        [Route("")]
        public IEnumerable<Customer> Get()
        {
            return Customer.CustomerList;
        }

        // GET: api/Customer/5
        [Route("{customerId}")]
        public object Get(string customerId)
        {
            var customers = Customer.CustomerList.Where(e => e.CustomerId == customerId).FirstOrDefault();
            return customers;
        }

        // POST: api/Customer
        [Route("add")]
        public bool Post([FromBody]Customer customer)
        {
            Customer.CustomerList.Add(customer);
            return true;
        }

        // PUT: api/Customer/5
        [Route("edit")]
        public bool Put( [FromBody]Customer customer)
        { 
            //Xac định đối tượng customer thực hiện chỉnh sửa thông tin trong List
            var customerEdit = Customer.CustomerList.Where(e => e.CustomerId == customer.CustomerId).FirstOrDefault();
            //Customer.CustomerList.Remove(customerEdit);
            //Customer.CustomerList.Add(customer);
            customerEdit.CustomerId = customer.CustomerId;
            customerEdit.CustomerName = customer.CustomerName;
            customerEdit.ManageName = customer.ManageName;
            customerEdit.TaxId = customer.TaxId;
            customerEdit.Phone = customer.Phone;
            customerEdit.Address = customer.Address;
            customerEdit.Email = customer.Email;
            return true;
            //Chỉnh sửa thông mới

            //Cập nhật lại dữ liệu customer
        }

        // DELETE: api/Customer/5
        [Route("delete/{customerId}")]
        public bool Delete(string customerId)
        {
            var customerDel = Customer.CustomerList.Where(e => e.CustomerId == customerId).FirstOrDefault();
            Customer.CustomerList.Remove(customerDel);
            return true;

        }
    }
}
