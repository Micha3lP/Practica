using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantillaPrueba.Models
{
    public partial class Movimiento
    {
        public int MovimientoId { get; set; }
        public int AsientoId { get; set; }
        public int CuentaId { get; set; }
        public decimal Valor { get; set; }
        public string TipoMovimiento { get; set; } = null!;
        public string? Descripcion { get; set; }
        [JsonIgnore]
        public virtual Asiento? Asiento { get; set; } = null!;
        [JsonIgnore]
        public virtual CuentasContable? Cuenta { get; set; } = null!;
    }
}
