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
            var customers = Customer.CustomerList.Where(e => e.CustomerId == customerId);
            return customers;
        }

        // POST: api/Customer
        [Route("AddCustomer")]
        public bool Post([FromBody]Customer customer)
        {
            Customer.CustomerList.Add(customer);
            return true;
        }

        // PUT: api/Customer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Customer/5
        public void Delete(int id)
        {
        }
    }
}
