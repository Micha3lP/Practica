using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantillaApiAuth.Models;

namespace PlantillaApiAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaquetesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PaquetesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Paquetes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paquete>>> GetPaquetes([FromQuery] string? nombre = null)
        {
            if (_context.Paquetes == null)
            {
                return NotFound();
            }

            var paquetes = _context.Paquetes.AsQueryable();

            if (!string.IsNullOrEmpty(nombre))
            {
                paquetes = paquetes.Where(p => p.Nombre.Contains(nombre));
            }

            return await paquetes.ToListAsync();
        }


        // GET: api/Paquetes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Paquete>> GetPaquete(int id)
        {
          if (_context.Paquetes == null)
          {
              return NotFound();
          }
            var paquete = await _context.Paquetes.FindAsync(id);

            if (paquete == null)
            {
                return NotFound();
            }

            return paquete;
        }

        // PUT: api/Paquetes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaquete(int id, PaqueteDTO paqueteDTO)
        {
            var paquete = await _context.Paquetes.FindAsync(id);
            if (paquete == null)
            {
                return NotFound();
            }

            // Actualizamos el paquete con los datos del DTO
            paquete.Nombre = paqueteDTO.Nombre;
            paquete.Descripcion = paqueteDTO.Descripcion;

            _context.Entry(paquete).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaqueteExists(id))
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

        // POST: api/Paquetes
        [HttpPost]
        public async Task<ActionResult<Paquete>> PostPaquete(PaqueteDTO paqueteDTO)
        {
            if (_context.Paquetes == null)
            {
                return Problem("Entity set 'DatabaseContext.Paquetes' is null.");
            }

            var paquete = new Paquete
            {
                Nombre = paqueteDTO.Nombre,
                Descripcion = paqueteDTO.Descripcion
            };

            _context.Paquetes.Add(paquete);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaquete", new { id = paquete.Id }, paquete);
        }

        // DELETE: api/Paquetes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaquete(int id)
        {
            if (_context.Paquetes == null)
            {
                return NotFound();
            }
            var paquete = await _context.Paquetes.FindAsync(id);
            if (paquete == null)
            {
                return NotFound();
            }

            _context.Paquetes.Remove(paquete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaqueteExists(int id)
        {
            return (_context.Paquetes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
