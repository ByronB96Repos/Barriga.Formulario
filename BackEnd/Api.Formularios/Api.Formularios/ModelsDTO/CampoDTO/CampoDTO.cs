namespace Api.Formularios.ModelsDTO.CampoDTO
{
    public class CampoDTO
    {
        public int CampoID { get; set; }
        public string CampoNombre { get; set; }
        public string CampoTipo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public int FormularioID { get; set; }
        public string FormularioNombre { get; set; }
    }
}
