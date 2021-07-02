using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class PersonaService
    {
        private readonly PersonaContext _context;
        public PersonaService(PersonaContext context)
        {
            _context = context;
        }
        public GuardarPersonaResponse Guardar(Persona persona)
        {
            try
            {
                _context.Persona.Add(persona);
                _context.SaveChanges();
                return new GuardarPersonaResponse(persona);
            }
            catch (Exception e)
            {
                return new GuardarPersonaResponse($"Error de la Aplicacion: {e.Message}");
            }

        }
        //GUARDAR PAGO
        public GuardarPagoResponse GuardarPago(Pagos pagos)
        {
            try
            {

                Console.WriteLine("hola entre al pago");
                _context.Pagos.Add(pagos);
                _context.SaveChanges();
                return new GuardarPagoResponse(pagos);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error de la Aplicacion: {e.Message} Excepction Interna {e.InnerException.Message} ");
                return new GuardarPagoResponse($"Error de la Aplicacion: {e.Message} Excepction Interna {e.InnerException.Message} ");
            }

        }
        //GUARDAR PRESTAMO
      public GuardarPrestamoResponse  GuardarPrestamos(Prestamos prestamos){
            try
            {
                Console.WriteLine("hola entre al PRESTAMO");
                _context.Prestamos.Add(prestamos);
                _context.SaveChanges();
                return new GuardarPrestamoResponse(prestamos);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error de la Aplicacion: {e.Message} Excepction Interna {e.InnerException.Message} ");
                return new GuardarPrestamoResponse($"Error de la Aplicacion: {e.Message} Excepction Interna {e.InnerException.Message} ");
            }
        }
        public List<Persona> ConsultarTodos()
        {

            List<Persona> personas = _context.Persona.ToList();
            return personas;
        }
        //pagos consulta
        public List<Pagos> ConsultarTodosPagos()
        {
            List<Pagos> pagos =_context.Pagos.ToList();
            return pagos;
        }
        public List<Prestamos> ConsultarTodosPrestamos()
        {
            List<Prestamos> prestamos =_context.Prestamos.ToList();
            return prestamos;
        }
        public string Eliminar(string identificacion)
        {
            try
            {
                var persona = _context.Persona.Find(identificacion);
                if (persona != null)
                {
                    _context.Persona.Remove(persona);
                    _context.SaveChanges();
                    return ($"El registro {persona.Nombres} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return $"Error de la Aplicación: {e.Message}";
            }

        }

        public string Modificar(Persona personaNueva)
        {
            try
            {
                var personaVieja = _context.Persona.Find(personaNueva.Identificacion);
                if (personaVieja != null)
                {
                    personaVieja.Nombres = personaNueva.Nombres;
                    personaVieja.Apellidos = personaNueva.Apellidos;
                    personaVieja.Identificacion = personaNueva.Identificacion;
                    personaVieja.Sexo = personaNueva.Sexo;
                    personaVieja.Edad = personaNueva.Edad;
                    personaVieja.TipoContrato = personaNueva.TipoContrato;
                    personaVieja.Estado = personaNueva.Estado;
                    _context.Persona.Update(personaVieja);
                    _context.SaveChanges();
                    return ($"El registro {personaNueva.Nombres} se ha modificado satisfactoriamente");
                }
                else
                {
                    return ($"Lo sentimos, {personaNueva.Identificacion} no se encuentra registrada");
                }
            }
            catch (Exception e)
            {
                return $"Error en la aplicacion: {e.Message}";
            }
        }

        public Persona BuscarxIdentificacion(int identificacion)
        {
            Persona persona = _context.Persona.Find(identificacion);
            return persona;
        }
        public Persona BuscarGrupal(string TipoContrato)
        {
            Persona persona = _context.Persona.Find(TipoContrato);
            return persona;
        }
        public int Totalizar()
        {
            return _context.Persona.Count();
        }
        public int TotalizarMujeres()
        {
            return _context.Persona.Count(p => p.Sexo == "Femenino");
        }
        public int TotalizarHombres()
        {
            return _context.Persona.Count(p => p.Sexo == "Masculino");
        }
    }

    public class GuardarPersonaResponse
    {
        public GuardarPersonaResponse(Persona persona)
        {
            Error = false;
            Persona = persona;
        }
        public GuardarPersonaResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Persona Persona { get; set; }

    }
        public class GuardarPagoResponse
    {
        public GuardarPagoResponse(Pagos pagos)
        {
            Error = false;
            Pagos = pagos;
        }
        public GuardarPagoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Pagos Pagos { get; set; }
    }
    public class GuardarPrestamoResponse
    {
        public GuardarPrestamoResponse(Prestamos prestamos)
        {
            Error = false;
            Prestamos = prestamos;
        }
        public GuardarPrestamoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Prestamos Prestamos { get; set; }
    }
}