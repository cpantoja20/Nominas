using System;
using Entity;

namespace Nominas.Models
{
    public class PagosModels
    {
        public int IdPersona { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFinal { get; set; }
    }

    public class PagosViewModel : PagosModels
    {
        public PagosViewModel()
        {
        }
        public PagosViewModel(Pagos pagos)
        {
            IdPersona = pagos.PersonaId;
            FechaInicio = pagos.FechaInicio;
            FechaFinal = pagos.FechaFinal;
        }
    }
}