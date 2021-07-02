using System;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Nominas.Config;
using Nominas.Models;

namespace Nominas.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        PersonaContext _context;
        UserService _userService;
        JwtService _jwtService;
        //agregale el paquete para ver las referemcias de las clases
    

        public LoginController(PersonaContext context, IOptions<AppSetting> appSettings)
        {
            _context = context;
            var admin = _context.Users.Find("admin");
            if (admin == null)
            {
                _context.Users.Add(new User()
                {
                    UserName = "admin",
                    Password = "admin",
                    Email = "admin@gmail.com",
                    Estado = "AC",
                }
                );
                var registrosGuardados = _context.SaveChanges();
            }
            _userService = new UserService(context);
            _jwtService = new JwtService(appSettings);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] LoginInputModel model)
        {
            var user = _userService.Validate(model.Username, model.Password);
            if (user == null) return BadRequest("Username or password is incorrect");
            var response = _jwtService.GenerateToken(user);
            return Ok(response);
        }


    }
}
