using Autofac;
using Sample.DAL.Extensions;
using Sample.Services.Extensions;

namespace Sample.WebAPI;

public class DependencyModule : Module
{
    private readonly IConfiguration _configuration;

    public DependencyModule(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterServices();
        builder.RegisterDatabaseContext(_configuration);
    }
}