using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantillaPrueba.Models
{
    public partial class Asiento
    {
        public Asiento()
        {
            Movimientos = new HashSet<Movimiento>();
        }

        public int AsientoId { get; set; }
        public DateTime Fecha { get; set; }
        public int DptoId { get; set; }
        public string Descripcion { get; set; } = null!;

        [JsonIgnore]
        public virtual Departamento? Dpto { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<Movimiento>? Movimientos { get; set; }
    }
}
