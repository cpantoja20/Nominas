using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Pagos
    {
        [Key]
       /// public int PagoId { get; set; }
        
        public string FechaInicio { get; set; }
        public string FechaFinal { get; set; }
        //una persona
        public int PersonaId { get; set; }
        //public Persona Persona { get; set; }

        //varias personas
        //public List<Persona> Persona { get; set; }
    }
}