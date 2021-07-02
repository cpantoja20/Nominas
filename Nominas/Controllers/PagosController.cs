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
    public class PagosController : ControllerBase
    {
        private readonly PersonaService _personaService;
        public PagosController(PersonaContext context)
        {
            _personaService = new PersonaService(context);
        }
        // GET: api/Persona
        [HttpGet]
        public IEnumerable<PagosViewModel> Gets()
        {
            var pagos = _personaService.ConsultarTodosPagos().Select(p => new PagosViewModel(p));
            return pagos;
        }
        // GET: api/Persona/5
        [HttpGet("{identificacion}")]
        public ActionResult<PersonaViewModel> Get(int identificacion)
        {
            var persona = _personaService.BuscarxIdentificacion(identificacion);
            if (persona == null) return NotFound();
            var personaViewModel = new PersonaViewModel(persona);
            return personaViewModel;
        }
        //POST: api/Pagos
        [HttpPost]
        public ActionResult<PagosViewModel> Post(PagosModels pagosInput)
        {
            Pagos pagos = MapearPago(pagosInput);
            var response = _personaService.GuardarPago(pagos);
            if (response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Pagos);
        }
        // DELETE: api/Persona/5
        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _personaService.Eliminar(identificacion);
            return Ok(mensaje);
        }
        private Persona MapearPersona(PersonaModels personaInput)
        {

            var persona = new Persona
            {
                Identificacion = personaInput.Identificacion,
                Nombres = personaInput.Nombres,
                Apellidos = personaInput.Apellidos,
                Sexo = personaInput.Sexo,
                FechaNacimiento = personaInput.Fechadenacimiento,
                Edad = personaInput.Edad,
                FechaIngreso = personaInput.FechaIngreso,
                TipoContrato = personaInput.TipoContrato,

            };
            return persona;
        }
        //SE MAPEA EL PAGO
        private Pagos MapearPago(PagosModels pagosInput)
        {

            var pagos = new Pagos
            {
                PersonaId = pagosInput.IdPersona,
                FechaInicio = pagosInput.FechaInicio,
                FechaFinal = pagosInput.FechaFinal,

            };
            return pagos;
        }
    }
}