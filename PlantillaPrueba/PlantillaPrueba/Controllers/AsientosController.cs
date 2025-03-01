﻿using System;
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
    public class AsientosController : ControllerBase
    {
        private readonly banco_guayaquilContext _context;

        public AsientosController(banco_guayaquilContext context)
        {
            _context = context;
        }

        // GET: api/Asientos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asiento>>> GetAsientos()
        {
          if (_context.Asientos == null)
          {
              return NotFound();
          }
            return await _context.Asientos.ToListAsync();
        }

        // GET: api/Asientos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asiento>> GetAsiento(int id)
        {
          if (_context.Asientos == null)
          {
              return NotFound();
          }
            var asiento = await _context.Asientos.FindAsync(id);

            if (asiento == null)
            {
                return NotFound();
            }

            return asiento;
        }

        // PUT: api/Asientos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsiento(int id, Asiento asiento)
        {
            if (id != asiento.AsientoId)
            {
                return BadRequest();
            }

            _context.Entry(asiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsientoExists(id))
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

        // POST: api/Asientos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Asiento>> PostAsiento(Asiento asiento)
        {
          if (_context.Asientos == null)
          {
              return Problem("Entity set 'banco_guayaquilContext.Asientos'  is null.");
          }
            _context.Asientos.Add(asiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsiento", new { id = asiento.AsientoId }, asiento);
        }

        // DELETE: api/Asientos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsiento(int id)
        {
            if (_context.Asientos == null)
            {
                return NotFound();
            }
            var asiento = await _context.Asientos.FindAsync(id);
            if (asiento == null)
            {
                return NotFound();
            }

            _context.Asientos.Remove(asiento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AsientoExists(int id)
        {
            return (_context.Asientos?.Any(e => e.AsientoId == id)).GetValueOrDefault();
        }
    }
}
