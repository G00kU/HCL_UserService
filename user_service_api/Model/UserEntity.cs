using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Email), IsUnique = true)]
public class UserEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Range(0, 120)]
    public int Age { get; set; }

    [Required]
    public string City { get; set; } = string.Empty;

    [Required]
    public string State { get; set; } = string.Empty;

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public string Pincode { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;
}