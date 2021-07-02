using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Nominas.Hubs;
using Nominas.Models;

namespace Nominas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PersonaController : ControllerBase
    {
        private readonly PersonaService _personaService;
         private readonly IHubContext<SignalHub> _hubContext;
       
        public PersonaController(PersonaContext context, IHubContext<SignalHub> hubContext)
        {
            _personaService = new PersonaService(context);
            _hubContext = hubContext;
        }
        // GET: api/Persona
        [HttpGet]
        public IEnumerable<PersonaViewModel> Gets()
        {
            var personas = _personaService.ConsultarTodos().Select(p => new PersonaViewModel(p));
            return personas;
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

        // POST: api/Persona
        [HttpPost]
        public async Task<ActionResult<PersonaViewModel>> PostAsync(PersonaModels personaInput)
        {
            Persona persona = MapearPersona(personaInput);
            var response = _personaService.Guardar(persona);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Persona", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            var personaViewModel = new PersonaViewModel(persona);
            await _hubContext.Clients.All.SendAsync("PersonaRegistrada", personaViewModel);
            return Ok(personaViewModel);
        }
        [HttpPut]
        public async Task<ActionResult<PersonaViewModel>> PutAsync(PersonaModels personaInput)
        {
            Persona persona = MapearPersona(personaInput);
            var response = _personaService.Modificar(persona);
            /*if (response.Error) 
            {
                ModelState.AddModelError("Guardar Persona", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }*/
            var personaViewModel = new PersonaViewModel(persona);
            await _hubContext.Clients.All.SendAsync("PersonaRegistrada", personaViewModel);
            return Ok(personaViewModel);
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
                Estado = personaInput.Estado,

            };
            return persona;
        }
        //SE MAPEA EL PAGO
        private Pagos MapearPago(PagosModels pagosInput)
        {

            var pagos = new Pagos
            {
                PersonaId= pagosInput.IdPersona,
                FechaInicio = pagosInput.FechaInicio,
                FechaFinal = pagosInput.FechaFinal,

            };
            return pagos;
        }
    }
    

}

