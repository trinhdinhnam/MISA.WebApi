using MISA.WEB_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.WEB_API.Controllers
{
    public class DefaultController : ApiController
    {
        // GET: api/Default
        [Route("tdnam")]
        [HttpGet]
        public int GetCustomer()
        {
            return 14234;
        }

        // GET: api/Default/5
        [Route("{name}/{age}")]
        [HttpGet]
        public string Get([FromUri] string name, [FromUri]int age)
        {
            return name+age;
        }

        // POST: api/Default
        [Route("post-customer/{name}")]
        [HttpPost]
        public Customer PostCustomer([FromUri]string name, Customer customer)
        {
            return customer;
        }

        // PUT: api/Default/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Default/5
        public void Delete(int id)
        {
        }
    }
}
