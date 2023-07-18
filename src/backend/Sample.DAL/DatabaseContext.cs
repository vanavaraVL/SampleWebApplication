using Microsoft.EntityFrameworkCore;
using Sample.DAL.Entities;
using Sample.DAL.ModelsMappings;

namespace Sample.DAL;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    public DbSet<CustomerEntity> Customers { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ModelsMappingsProfile.Map(modelBuilder);

        base.OnModelCreating(modelBuilder);
    }
}