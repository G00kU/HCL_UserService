using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using user_service_api.Data;
using user_service_api.Model;

namespace user_service_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly IPasswordHasher<UserEntity> _passwordHasher;
        private readonly JwtService _jwtService;
        public AuthController(
            UserContext context,
            IPasswordHasher<UserEntity> passwordHasher,
            JwtService jwtService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            if (string.IsNullOrWhiteSpace(login.Email) ||
                string.IsNullOrWhiteSpace(login.Password))
            {
                return BadRequest(new
                {
                    message = "Email and password are required"
                });
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.Email == login.Email);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password"
                });
            }
            var passwordResult =
                _passwordHasher.VerifyHashedPassword(
                    user,
                    user.PasswordHash,
                    login.Password
                );
            if (passwordResult ==
                PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password"
                });
            }
            var token = _jwtService.GenerateToken(user);
            return Ok(new
            {
                message = "Login successful",
                token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Age,
                    user.City,
                    user.State,
                    user.Pincode
                }
            });
        }
    }
}