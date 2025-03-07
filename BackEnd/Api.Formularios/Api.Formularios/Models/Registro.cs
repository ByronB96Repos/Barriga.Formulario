namespace Api.Formularios.Models
{
    public class Registro
    {
        public int RegistroID { get; set; }
        public int FormularioID { get; set; }
        public string Valores { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}
