using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Persona
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Identificacion { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Sexo { get; set; }
        public string FechaNacimiento { get; set; }
        public int Edad { get; set; }
        public string FechaIngreso { get; set; }
        public string TipoContrato { get; set; }
        public string Estado  { get; set; }
    }
}
   