using System;
using System.Collections.Generic;

namespace PlantillaApiAuth.Models
{
    public partial class Persona
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public int UsuarioId { get; set; }

        public virtual Usuario Usuario { get; set; } = null!;
    }
}
