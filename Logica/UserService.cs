using Datos;
using Entity;
using System.Linq;

namespace Logica
{
    public class UserService
    {
        private readonly PersonaContext _context;

        public UserService(PersonaContext context)=> _context = context;

        public User Validate(string userName, string password) 
        {
            return _context.Users.FirstOrDefault(t => t.UserName == userName && t.Password == password && t.Estado == "AC");
        }
    }
}
