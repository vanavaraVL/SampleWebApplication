using Sample.Services.Exceptions.Infrastructure;

namespace Sample.Services.Exceptions;

public class NotFoundException: Exception, ISampleException
{
    public NotFoundException(string message, Exception innerException) : base(message, innerException)
    {

    }

    public object ToJsonObject()
    {
        return new { Message, InnerException };
    }
}