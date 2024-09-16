using System;
using System.Collections.Generic;

namespace PlantillaApiAuth.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Personas = new HashSet<Persona>();
        }

        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RoleId { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Persona> Personas { get; set; }
    }
}
