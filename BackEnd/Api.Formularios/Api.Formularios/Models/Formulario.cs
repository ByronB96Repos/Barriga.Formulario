using System.ComponentModel.DataAnnotations;

namespace Api.Formularios.Models
{
    public class Formulario
    {
        [Key]
        public int FormularioID { get; set; }
        public string FormularioNombre { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public ICollection<Campo> Campos { get; set; }
    }
}
