using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using user_service_api.Data;
using user_service_api.Model;

namespace user_service_api.Tests;

public class UserServiceTests
{
    private UserContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<UserContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new UserContext(options);
    }

    private UserService CreateService(UserContext context)
    {
        var passwordHasher = new PasswordHasher<UserEntity>();

        return new UserService(
            context,
            passwordHasher
        );
    }

    
    [Fact]
    public async Task CreateUserAsync_Should_Create_User()
    {
        using var context = CreateContext();

        var service = CreateService(context);

        var user = new UserEntity
        {
            Name = "Gokul",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001"
        };

        var result = await service.CreateUserAsync(user);

        result.Should().NotBeNull();

        result.Name.Should().Be("Gokul");
        result.Email.Should().Be("gokul@gmail.com");
        result.Age.Should().Be(28);
        result.City.Should().Be("Chennai");
        result.State.Should().Be("Tamil Nadu");
        result.Pincode.Should().Be("600001");

        context.Users.Count().Should().Be(1);
    }

    [Fact]
    public async Task CreateUserAsync_Should_Generate_PasswordHash()
    {
        using var context = CreateContext();
        var passwordHasher = new PasswordHasher<UserEntity>();
        var service = new UserService(
            context,
            passwordHasher
        );

        var user = new UserEntity
        {
            Name = "Gokul",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001"
        };
        await service.CreateUserAsync(user);
        var savedUser = await context.Users
            .FirstAsync();

        savedUser.PasswordHash
            .Should()
            .NotBeNullOrEmpty();

        savedUser.PasswordHash
            .Should()
            .NotBe("Gokul28");
    }

    [Fact]
    public async Task CreateUserAsync_Should_Throw_When_Email_Already_Exists()
    {
        using var context = CreateContext();

        var existingUser = new UserEntity
        {
            Name = "Existing User",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001",
            PasswordHash = "existing-hash"
        };

        context.Users.Add(existingUser);

        await context.SaveChangesAsync();

        var service = CreateService(context);

        var newUser = new UserEntity
        {
            Name = "New User",
            Email = "gokul@gmail.com",
            Age = 30,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600002"
        };
        var action = () =>
            service.CreateUserAsync(newUser);

        // Assert
        await action.Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage("Email already exists");
    }

    [Fact]
    public async Task GetUsersAsync_Should_Return_All_Users()
    {
        using var context = CreateContext();

        context.Users.AddRange(
            new UserEntity
            {
                Name = "Gokul",
                Email = "gokul@gmail.com",
                Age = 28,
                City = "Chennai",
                State = "Tamil Nadu",
                Pincode = "600001",
                PasswordHash = "hash1"
            },
            new UserEntity
            {
                Name = "John",
                Email = "john@gmail.com",
                Age = 30,
                City = "Bangalore",
                State = "Karnataka",
                Pincode = "560001",
                PasswordHash = "hash2"
            }
        );

        await context.SaveChangesAsync();

        var service = CreateService(context);
        var result = await service.GetUsersAsync();
        result.Should().NotBeNull();
        result.Should().HaveCount(2);

        result.Should().Contain(x =>
            x.Email == "gokul@gmail.com");

        result.Should().Contain(x =>
            x.Email == "john@gmail.com");
    }

    [Fact]
    public async Task GetUserByIdAsync_Should_Return_User()
    {

        using var context = CreateContext();

        var user = new UserEntity
        {
            Name = "Gokul",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001",
            PasswordHash = "hash"
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        var service = CreateService(context);
        var result =
            await service.GetUserByIdAsync(user.Id);
        result.Should().NotBeNull();

        result!.Id.Should().Be(user.Id);
        result.Name.Should().Be("Gokul");
        result.Email.Should().Be("gokul@gmail.com");
        result.Age.Should().Be(28);
    }

    [Fact]
    public async Task GetUserByIdAsync_Should_Return_Null_For_Invalid_Id()
    {
        using var context = CreateContext();

        var service = CreateService(context);
        var result =
            await service.GetUserByIdAsync(999);
        result.Should().BeNull();
    }


    [Fact]
    public async Task UpdateUserAsync_Should_Update_User()
    {
        // Arrange
        using var context = CreateContext();

        var user = new UserEntity
        {
            Name = "Gokul",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001",
            PasswordHash = "hash"
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        var service = CreateService(context);

        user.Name = "Arun Kumar";
        user.Age = 29;
        user.City = "Coimbatore";

        var result =
            await service.UpdateUserAsync(user.Id, user);

        result.Should().NotBeNull();

        result!.Name.Should().Be("Arun Kumar");
        result.Age.Should().Be(29);
        result.City.Should().Be("Coimbatore");

        var databaseUser =
            await context.Users.FindAsync(user.Id);

        databaseUser.Should().NotBeNull();
        databaseUser!.Name.Should().Be("Arun Kumar");
        databaseUser.Age.Should().Be(29);
        databaseUser.City.Should().Be("Coimbatore");
    }


    [Fact]
    public async Task DeleteUserAsync_Should_Delete_User()
    {
 
        using var context = CreateContext();

        var user = new UserEntity
        {
            Name = "Gokul",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001",
            PasswordHash = "hash"
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        var service = CreateService(context);

        await service.DeleteUserAsync(user.Id);

        var deletedUser =
            await context.Users.FindAsync(user.Id);

        deletedUser.Should().BeNull();
    }

    [Fact]
    public async Task DeleteUserAsync_Should_Not_Delete_Other_Users()
    {

        using var context = CreateContext();

        var user1 = new UserEntity
        {
            Name = "Gokul",
            Email = "gokul@gmail.com",
            Age = 28,
            City = "Chennai",
            State = "Tamil Nadu",
            Pincode = "600001",
            PasswordHash = "hash"
        };

        var user2 = new UserEntity
        {
            Name = "John",
            Email = "john@gmail.com",
            Age = 30,
            City = "Bangalore",
            State = "Karnataka",
            Pincode = "560001",
            PasswordHash = "hash"
        };

        context.Users.AddRange(user1, user2);

        await context.SaveChangesAsync();

        var service = CreateService(context);

        await service.DeleteUserAsync(user1.Id);

        var remainingUser =
            await context.Users.FindAsync(user2.Id);
        remainingUser.Should().NotBeNull();
        remainingUser!.Email.Should().Be("john@gmail.com");
    }
}
