using Api.Formularios.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Formularios.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}
        public DbSet<Formulario> Formularios { get; set; }
        public DbSet<Campo> Campos { get; set; }
        public DbSet<Registro> Registros { get; set; }
    }
}
