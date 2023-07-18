using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Sample.DAL;

internal class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
{
    public DatabaseContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            
        optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS; Database=SampleDb; Trusted_Connection=True;");

        return new DatabaseContext(optionsBuilder.Options);
    }
}