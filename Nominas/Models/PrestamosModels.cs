using System;
using Entity;

namespace Nominas.Models
{
    public class PrestamosModels
    {
        public int Idempleado { get; set; }
        public string FechadePrestamo { get; set; }
        public string ValorPrestamo { get; set; }
        public string EstadoPrestamo  {get;set;}
    }

    public class PrestamosViewModel : PrestamosModels
    {
        public PrestamosViewModel(Prestamos Prestamos)
        {
            Idempleado = Prestamos.Idempleado;
            FechadePrestamo = Prestamos.FechadePrestamo;
            ValorPrestamo = Prestamos.ValorPrestamo;
            EstadoPrestamo = Prestamos.EstadoPrestamo;
        }
    }
}