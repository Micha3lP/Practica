using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PlantillaApiAuth.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PlantillaApiAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            // Buscar el usuario en la base de datos
            var usuario = _context.Usuarios.SingleOrDefault(u => u.Username == login.Username);
            if (usuario == null || !VerifyPasswordHash(login.Password, usuario.Password))
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            // Obtener el nombre del rol desde el Role asociado al usuario
            var roleName = _context.Roles
                .Where(r => r.Id == usuario.RoleId)
                .Select(r => r.Nombre)
                .FirstOrDefault();

            if (roleName == null)
            {
                return Unauthorized("Rol no válido.");
            }

            // Generar token JWT
            var token = GenerateJwtToken(usuario, roleName);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel register)
        {
            // Validar si el usuario ya existe
            var existingUser = _context.Usuarios.SingleOrDefault(u => u.Username == register.Username);
            if (existingUser != null)
            {
                return BadRequest("El nombre de usuario ya está en uso.");
            }

            // Generar hash de la contraseña
            var passwordHash = HashPassword(register.Password);

            // Crear un nuevo usuario
            var newUser = new Usuario
            {
                Username = register.Username,
                Password = passwordHash,
                RoleId = register.RoleId
            };

            _context.Usuarios.Add(newUser);
            _context.SaveChanges();

            // Aquí no se genera el token inmediatamente; el usuario debe hacer login primero.
            return Ok("Usuario registrado exitosamente.");
        }

        // Método para generar un hash de la contraseña usando HMAC y la clave secreta de JWT
        private string HashPassword(string password)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            using (var hmac = new HMACSHA256(key))
            {
                var passwordBytes = Encoding.UTF8.GetBytes(password);
                var hash = hmac.ComputeHash(passwordBytes);
                return Convert.ToBase64String(hash);
            }
        }

        // Método para verificar que la contraseña proporcionada coincida con el hash almacenado
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            using (var hmac = new HMACSHA256(key))
            {
                var passwordBytes = Encoding.UTF8.GetBytes(password);
                var computedHash = hmac.ComputeHash(passwordBytes);
                var computedHashBase64 = Convert.ToBase64String(computedHash);
                return computedHashBase64 == storedHash;
            }
        }

        // Método para generar un token JWT
        private string GenerateJwtToken(Usuario usuario, string roleName)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Username),
                new Claim("role", roleName), // Ahora se pasa el nombre del rol
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
    }
}
