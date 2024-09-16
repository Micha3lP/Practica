using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantillaPrueba.Models;

namespace PlantillaPrueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasContablesController : ControllerBase
    {
        private readonly banco_guayaquilContext _context;

        public CuentasContablesController(banco_guayaquilContext context)
        {
            _context = context;
        }

        // GET: api/CuentasContables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CuentasContable>>> GetCuentasContables()
        {
          if (_context.CuentasContables == null)
          {
              return NotFound();
          }
            return await _context.CuentasContables.ToListAsync();
        }

        // GET: api/CuentasContables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CuentasContable>> GetCuentasContable(int id)
        {
          if (_context.CuentasContables == null)
          {
              return NotFound();
          }
            var cuentasContable = await _context.CuentasContables.FindAsync(id);

            if (cuentasContable == null)
            {
                return NotFound();
            }

            return cuentasContable;
        }

        // PUT: api/CuentasContables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCuentasContable(int id, CuentasContable cuentasContable)
        {
            if (id != cuentasContable.CuentaId)
            {
                return BadRequest();
            }

            _context.Entry(cuentasContable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CuentasContableExists(id))
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

        // POST: api/CuentasContables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CuentasContable>> PostCuentasContable(CuentasContable cuentasContable)
        {
          if (_context.CuentasContables == null)
          {
              return Problem("Entity set 'banco_guayaquilContext.CuentasContables'  is null.");
          }
            _context.CuentasContables.Add(cuentasContable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCuentasContable", new { id = cuentasContable.CuentaId }, cuentasContable);
        }

        // DELETE: api/CuentasContables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuentasContable(int id)
        {
            if (_context.CuentasContables == null)
            {
                return NotFound();
            }
            var cuentasContable = await _context.CuentasContables.FindAsync(id);
            if (cuentasContable == null)
            {
                return NotFound();
            }

            _context.CuentasContables.Remove(cuentasContable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CuentasContableExists(int id)
        {
            return (_context.CuentasContables?.Any(e => e.CuentaId == id)).GetValueOrDefault();
        }
    }
}
