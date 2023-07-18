namespace Sample.DAL.Entities;

public class CustomerEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public CustomerSex Sex { get; set; }
}

public enum CustomerSex
{
    Male = 0,
    Female = 1
}