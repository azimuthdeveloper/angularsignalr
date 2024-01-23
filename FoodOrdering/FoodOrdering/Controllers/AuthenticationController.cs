using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FoodOrdering.Model;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]/[action]")]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthenticationController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> Login(Authentication authentication)
    {
        if (authentication.Username == "admin" && authentication.Password == "password")
        {
            // Generate JWT token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, authentication.Username)
            };
            var token = GenerateJwtToken(claims);

            return Ok(new { token });
        }
        else
        {
            return Unauthorized();
        }
    }

    private string GenerateJwtToken(List<Claim> claims)
    {
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];
        var signingKey = Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"]);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
}