using Autofac;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Sample.DAL.Extensions;

public static class DependencyInjection
{
    public static void RegisterDatabaseContext(this ContainerBuilder builder, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DatabaseDb");
        var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlServer(connectionString).Options;

        builder
            .RegisterType<DatabaseContext>()
            .WithParameter("options", options)
            .As<DbContext>()
            .As<DatabaseContext>()
            .InstancePerLifetimeScope();
    }
}