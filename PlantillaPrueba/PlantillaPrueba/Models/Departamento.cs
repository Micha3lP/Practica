using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantillaPrueba.Models
{
    public partial class Departamento
    {
        public Departamento()
        {
            Asientos = new HashSet<Asiento>();
        }

        public int DptoId { get; set; }
        public string DescDpto { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Asiento>? Asientos { get; set; }
    }
}
