using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using user_service_api.Data;
using user_service_api.Model;

public class UserService : IUserService
{
    private readonly UserContext _context;
    private readonly IPasswordHasher<UserEntity> _passwordHasher;

    public UserService(
        UserContext context,
        IPasswordHasher<UserEntity> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<List<UserResponseDto>> GetUsersAsync()
    {
        return await _context.Users
            .Select(user => new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.Age,
                City = user.City,
                State = user.State,
                Pincode = user.Pincode
            })
            .ToListAsync();
    }

    public async Task<UserResponseDto?> GetUserByIdAsync(int id)
    {
        return await _context.Users
            .Where(user => user.Id == id)
            .Select(user => new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.Age,
                City = user.City,
                State = user.State,
                Pincode = user.Pincode
            })
            .FirstOrDefaultAsync();
    }

    public async Task<UserResponseDto> CreateUserAsync(UserEntity user)
    {
        var password = $"{user.Name}{user.Age}";
        var exists = await _context.Users
    .AnyAsync(x => x.Email == user.Email);

        if (exists)
        {
            throw new InvalidOperationException("Email already exists");
        }
        user.PasswordHash =
            _passwordHasher.HashPassword(user, password);

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Age = user.Age,
            City = user.City,
            State = user.State,
            Pincode = user.Pincode
        };
    }

    public async Task<UserResponseDto?> UpdateUserAsync(
        int id,
        UserEntity user)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(x => x.Id == id);

        if (existingUser == null)
        {
            return null;
        }

        existingUser.Name = user.Name;
        existingUser.Email = user.Email;
        existingUser.Age = user.Age;
        existingUser.City = user.City;
        existingUser.State = user.State;
        existingUser.Pincode = user.Pincode;

        var password = $"{user.Name}{user.Age}";

        existingUser.PasswordHash =
            _passwordHasher.HashPassword(existingUser, password);

        await _context.SaveChangesAsync();

        return new UserResponseDto
        {
            Id = existingUser.Id,
            Name = existingUser.Name,
            Email = existingUser.Email,
            Age = existingUser.Age,
            City = existingUser.City,
            State = existingUser.State,
            Pincode = existingUser.Pincode
        };
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Id == id);

        if (user == null)
        {
            return false;
        }

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();

        return true;
    }
}