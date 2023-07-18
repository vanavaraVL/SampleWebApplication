using Autofac;

namespace Sample.Services.Extensions;

public static class DependencyInjection
{
    public static void RegisterServices(this ContainerBuilder builder)
    {
        builder.RegisterType<CustomersService>().As<ICustomersService>().InstancePerLifetimeScope();
    }
}