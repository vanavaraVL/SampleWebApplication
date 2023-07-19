namespace Sample.WebAPI.Middleware.Extensions;

public static class DependencyInjection
{
    public static void RegisterMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<SampleExceptionHandlingMiddleware>();
    }
}