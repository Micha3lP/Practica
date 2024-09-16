using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantillaPrueba.Models
{
    public partial class CuentasContable
    {
        public CuentasContable()
        {
            Movimientos = new HashSet<Movimiento>();
        }

        public int CuentaId { get; set; }
        public string NumCuenta { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<Movimiento>? Movimientos { get; set; }
    }
}
