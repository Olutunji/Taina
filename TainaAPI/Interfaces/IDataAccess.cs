using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TainaAPI.Models;

namespace TainaAPI.Interfaces
{
    interface IDataAccess
    {
        List<PersonDetail> Get();

        PersonDetail Get(int id);

        void Add(PersonDetail person);

        void Update(int id, PersonDetail person);

        void Delete(int id);
    }
}
