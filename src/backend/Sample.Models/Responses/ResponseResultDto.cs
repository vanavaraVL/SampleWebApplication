namespace Sample.Models.Responses;

public record ResponseResultDto<T>
{
    public T ResultItem { get; init; } = default!;

    public string? Error { get; set; }
}