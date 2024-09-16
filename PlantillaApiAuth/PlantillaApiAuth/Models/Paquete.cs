using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantillaApiAuth.Models
{
    public partial class Paquete
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Descripcion { get; set; }
    }
}
public class PaqueteDTO
{
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
}