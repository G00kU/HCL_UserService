using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using user_service_api.Data;

namespace user_service_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser(UserEntity user)
        {
            try
            {
                var createdUser = await _userService.CreateUserAsync(user);
                return CreatedAtAction(
                    nameof(GetUser),
                    new { id = createdUser.Id },
                    createdUser);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    message = ex.Message
                });
            }
           
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(
            int id,
            UserEntity user)
        {
            var updatedUser =
                await _userService.UpdateUserAsync(id, user);

            if (updatedUser == null)
            {
                return NotFound();
            }

            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userService.DeleteUserAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
