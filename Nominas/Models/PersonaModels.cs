using System;
using Entity;

namespace Nominas.Models
{
    public class PersonaModels
    {

        public int Identificacion { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Sexo { get; set; }
        public string Fechadenacimiento { get; set; }
        public int Edad { get; set; }
        public string FechaIngreso { get; set; }
        public string TipoContrato { get; set; }
        public string Estado {get; set;}
    }

    public class PersonaViewModel : PersonaModels
    {
        public PersonaViewModel()
        {
        }
        public PersonaViewModel(Persona persona)
        {
            Identificacion = persona.Identificacion;
            Nombres = persona.Nombres;
            Apellidos = persona.Apellidos;
            Sexo = persona.Sexo;
            Fechadenacimiento = persona.FechaNacimiento;
            Edad = persona.Edad;
            FechaIngreso = persona.FechaIngreso;
            TipoContrato = persona.TipoContrato;
            Estado = persona.Estado;
        }

        // public decimal Pulsacion { get; set; }
    }
}