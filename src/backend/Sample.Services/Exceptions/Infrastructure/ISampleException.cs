namespace Sample.Services.Exceptions.Infrastructure;

public interface ISampleException
{
    string Message { get; }

    object ToJsonObject();
}