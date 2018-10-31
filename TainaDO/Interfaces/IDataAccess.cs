using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TainaAPI.Models;

namespace TainaAPI.Interfaces
{
    public interface IDataAccess
    {
        List<PersonDetail> GetPeople();

        PersonDetail GetPerson(int id);

        void AddPerson(PersonDetail person);

        void UpdatePerson(int id, PersonDetail person);

        void DeletePerson(int id);
    }
}
