using System.ComponentModel.DataAnnotations;
namespace Entity
{
    public class Prestamos
    {
        [Key]
        public int Id { get; set; }
        public int Idempleado { get; set; }
        public string FechadePrestamo {get;set;}
        public string ValorPrestamo{get;set;}
        public string EstadoPrestamo{get;set;}
    }
}