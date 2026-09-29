using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using user_service_api.Model;

public class JwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string GenerateToken(UserEntity user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = jwtSettings["Key"]!;
        var issuer = jwtSettings["Issuer"];
        var audience = jwtSettings["Audience"];
        var expiryMinutes =
            int.Parse(jwtSettings["ExpiryMinutes"] ?? "60");
        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                user.Id.ToString()
            ),

            new Claim(
                ClaimTypes.Name,
                user.Name
            ),

            new Claim(
                ClaimTypes.Email,
                user.Email
            )
        };
        var securityKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            );

        var credentials =
            new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}