using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TainaAPI.Data_Access;
using TainaAPI.Models;

namespace TainaAPI.Controllers
{
    public class PersonController : ApiController
    {
        private SQLDataAccess dataAccess;

        // GET: api/Person
        public List<PersonDetail> Get()
        {
            dataAccess = new SQLDataAccess();
            List<PersonDetail> people = dataAccess.GetPeople();

            return people;
        }

        // GET: api/Person/5
        public PersonDetail Get(int id)
        {
            dataAccess = new SQLDataAccess();
            PersonDetail person = dataAccess.GetPerson(id);

            return person;
        }

        // POST: api/Person
        public void Post(PersonDetail person)
        {
            dataAccess = new SQLDataAccess();
            dataAccess.AddPerson(person);
        }

        // PUT: api/Person/5
        public void Put(int id, PersonDetail person)
        {
            dataAccess = new SQLDataAccess();
            dataAccess.UpdatePerson(id, person);
        }

        // DELETE: api/Person/5
        public void Delete(int id)
        {
            dataAccess = new SQLDataAccess();
            dataAccess.DeletePerson(id);
        }
    }
}
