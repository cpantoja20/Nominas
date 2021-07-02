using Entity;
using Nominas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Datos;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
namespace Nominas.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamosController : ControllerBase
    {
        private readonly PersonaService _personaService;
        public PrestamosController(PersonaContext context)
        {
            _personaService = new PersonaService(context);
        }
        // GET: api/Prestamos
        [HttpGet]
        public IEnumerable<PrestamosViewModel> Gets()
        {
            var prestamos = _personaService.ConsultarTodosPrestamos().Select(p => new PrestamosViewModel(p));
            return prestamos;
        }
        //POST: api/Prestamos
        [HttpPost]
        public ActionResult<PrestamosViewModel> Post(PrestamosModels prestamosInput)
        {
            Prestamos prestamos = MapearPrestamos(prestamosInput);
            var response = _personaService.GuardarPrestamos(prestamos);
            if (response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Prestamos);
        }
        private Prestamos MapearPrestamos(PrestamosModels prestamosInput)
        {

            var prestamos = new Prestamos
            {   Idempleado = prestamosInput.Idempleado,
                FechadePrestamo = prestamosInput.FechadePrestamo,
                ValorPrestamo = prestamosInput.ValorPrestamo,
                EstadoPrestamo = prestamosInput.EstadoPrestamo
            };
            return prestamos;
       }   
    }

}