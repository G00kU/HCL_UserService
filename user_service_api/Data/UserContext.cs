using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace user_service_api.Data
{
    public class UserContext : DbContext
    {
        public UserContext (DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; } = default!;
    }
}
