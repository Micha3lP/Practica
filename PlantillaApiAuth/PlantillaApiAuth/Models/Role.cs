using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantillaApiAuth.Models
{
    public partial class Role
    {
        public Role()
        {
            Usuarios = new HashSet<Usuario>();
        }
        [JsonIgnore]
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
