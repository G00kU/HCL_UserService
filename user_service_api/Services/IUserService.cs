using user_service_api.Model;

public interface IUserService
{
    Task<List<UserResponseDto>> GetUsersAsync();

    Task<UserResponseDto?> GetUserByIdAsync(int id);

    Task<UserResponseDto> CreateUserAsync(UserEntity user);

    Task<UserResponseDto?> UpdateUserAsync(
        int id,
        UserEntity user);

    Task<bool> DeleteUserAsync(int id);
}