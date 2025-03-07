using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Formularios.Data;
using Api.Formularios.Models;
using Api.Formularios.ModelsDTO.CampoDTO;

namespace Api.Formularios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CamposController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CamposController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campo>>> GetCampos()
        {
            var lista = await (from c in _context.Campos
                               join f in _context.Formularios on c.FormularioID equals f.FormularioID
                               select new CampoDTO
                               {
                                   CampoID = c.CampoID,
                                   CampoNombre = c.CampoNombre,
                                   CampoTipo = c.CampoTipo,
                                   FechaCreacion = c.FechaCreacion,
                                   FechaEdicion = c.FechaEdicion,
                                   FormularioID = c.FormularioID,
                                   FormularioNombre = f.FormularioNombre
                               }).ToListAsync();
            return Ok(lista);
        }

        [HttpGet("F/{id}")]
        public async Task<ActionResult<IEnumerable<Campo>>> GetCamposFormulario(int id)
        {
            var lista = await (from c in _context.Campos
                               join f in _context.Formularios on c.FormularioID equals f.FormularioID
                               where c.FormularioID == id
                               select new CampoDTO
                               {
                                   CampoID = c.CampoID,
                                   CampoNombre = c.CampoNombre,
                                   CampoTipo = c.CampoTipo,
                                   FechaCreacion = c.FechaCreacion,
                                   FechaEdicion = c.FechaEdicion,
                                   FormularioID = c.FormularioID,
                                   FormularioNombre = f.FormularioNombre
                               }).ToListAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Campo>> GetCampo(int id)
        {
            var campo = await (from c in _context.Campos
                               join f in _context.Formularios on c.FormularioID equals f.FormularioID
                               where c.CampoID == id
                               select new CampoDTO
                               {
                                   CampoID = c.CampoID,
                                   CampoNombre = c.CampoNombre,
                                   CampoTipo = c.CampoTipo,
                                   FechaCreacion = c.FechaCreacion,
                                   FechaEdicion = c.FechaEdicion,
                                   FormularioID = c.FormularioID,
                                   FormularioNombre = f.FormularioNombre
                               }).FirstOrDefaultAsync();

            if (campo == null)
            {
                return NotFound();
            }

            return Ok(campo);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampo(int id, CampoEditDTO campodto)
        {
            if (id != campodto.CampoID)
            {
                return BadRequest();
            }

            var campo = await _context.Campos.FindAsync(id);
            if (campo == null)
            {
                return NotFound();
            }
            campo.CampoNombre = campodto.CampoNombre;
            campo.CampoTipo = campodto.CampoTipo;
            campo.FechaEdicion = DateTime.Now;
            
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
        public async Task<ActionResult<Campo>> PostCampo(CampoRegisterDTO campodto)
        {
            var campo = new Campo
            {
                CampoID = 0,
                CampoNombre = campodto.CampoNombre,
                CampoTipo = campodto.CampoTipo,
                FormularioID = campodto.FormularioID,
                FechaCreacion = DateTime.Now,
                FechaEdicion = DateTime.Now
            };

            _context.Campos.Add(campo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampo", new { id = campo.CampoID }, campo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampo(int id)
        {
            var campo = await _context.Campos.FindAsync(id);
            if (campo == null)
            {
                return NotFound();
            }

            _context.Campos.Remove(campo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampoExists(int id)
        {
            return _context.Campos.Any(e => e.CampoID == id);
        }
    }
}
