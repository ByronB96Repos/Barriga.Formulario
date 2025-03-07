using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Formularios.Data;
using Api.Formularios.Models;
using Api.Formularios.ModelsDTO.FormularioDTO;

namespace Api.Formularios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormulariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FormulariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Formulario>>> GetFormularios()
        {
            return await _context.Formularios.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Formulario>> GetFormulario(int id)
        {
            var formulario = await _context.Formularios.FindAsync(id);

            if (formulario == null)
            {
                return NotFound();
            }

            return formulario;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormulario(int id, FormularioEditDTO formulariodto)
        {
            if (id != formulariodto.FormularioID)
            {
                return BadRequest();
            }

            var formulario = await _context.Formularios.FindAsync(id);
            if (formulario == null)
            {
                return NotFound();
            }

            formulario.FormularioNombre = formulariodto.FormularioNombre;
            formulario.FechaEdicion = DateTime.Now;
          
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Formulario>> PostFormulario(FormularioRegisterDTO formulariodto)
        {
            var formulario = new Formulario
            {
                FormularioID = 0,
                FormularioNombre = formulariodto.FormularioNombre,
                FechaCreacion = DateTime.Now,
                FechaEdicion = DateTime.Now,
                Campos = []
            };
            _context.Formularios.Add(formulario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormulario", new { id = formulario.FormularioID }, formulario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormulario(int id)
        {
            var formulario = await _context.Formularios.FindAsync(id);
            if (formulario == null)
            {
                return NotFound();
            }

            _context.Formularios.Remove(formulario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FormularioExists(int id)
        {
            return _context.Formularios.Any(e => e.FormularioID == id);
        }
    }
}
