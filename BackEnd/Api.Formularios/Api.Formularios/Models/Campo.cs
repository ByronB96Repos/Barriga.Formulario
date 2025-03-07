using System.ComponentModel.DataAnnotations;

namespace Api.Formularios.Models
{
    public class Campo
    {
        [Key]
        public int CampoID { get; set; }
        public string CampoNombre { get; set; }
        public string CampoTipo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public int FormularioID { get; set; }
    }
}
