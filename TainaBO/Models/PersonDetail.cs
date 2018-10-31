using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TainaAPI.Models
{
    public class PersonDetail
    {
        public int PersonId { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.Now;

        public String FirstName { get; set; } = "";

        public String SurName { get; set; } = "";

        public String Gender { get; set; } = "";

        public String Email { get; set; } = "";

        public String PhoneNumber { get; set; } = "";

        public String GetPersonDetailString(PersonDetail person)
        {
            return $"FirstName {person.FirstName}, Surname {person.SurName}, Gender {person.Gender}, Email {person.Email}, PhoneNumber {person.PhoneNumber} ";
        }
    }
}