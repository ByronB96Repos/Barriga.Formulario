using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Formularios.Data;
using Api.Formularios.Models;
using Api.Formularios.ModelsDTO.RegistroDTO;

namespace Api.Formularios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegistrosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Registros
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registro>>> GetRegistros()
        {
            return await _context.Registros.ToListAsync();
        }

        // GET: api/Registros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Registro>> GetRegistro(int id)
        {
            var registro = await _context.Registros.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            return registro;
        }

        [HttpGet("F/{id}")]
        public async Task<ActionResult<IEnumerable<Registro>>> GetRegistrosFormulario(int id)
        {
            var registros = await _context.Registros.Where(r => r.FormularioID == id).ToListAsync();
            if (registros == null)
            {
                return NotFound();
            }

            return registros;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistro(int id, Registro registro)
        {
            if (id != registro.RegistroID)
            {
                return BadRequest();
            }

            _context.Entry(registro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

       
        [HttpPost]
        public async Task<ActionResult<Registro>> PostRegistro(RegistroRegisterDTO registrodto)
        {
            var registro = new Registro {
                FormularioID = registrodto.FormularioId,
                Valores = System.Text.Json.JsonSerializer.Serialize(registrodto.Valores),
                FechaCreacion = DateTime.Now,
                FechaEdicion = DateTime.Now,
                RegistroID = 0,

            };
            _context.Registros.Add(registro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistro", new { id = registro.RegistroID }, registro);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistro(int id)
        {
            var registro = await _context.Registros.FindAsync(id);
            if (registro == null)
            {
                return NotFound();
            }

            _context.Registros.Remove(registro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroExists(int id)
        {
            return _context.Registros.Any(e => e.RegistroID == id);
        }
    }
}
