using Microsoft.EntityFrameworkCore;
using Sample.DAL.Entities;

namespace Sample.DAL.ModelsMappings;

public class CustomersMapping : IModelMapping
{
    public void Map(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<CustomerEntity>();

        entity.Property(x => x.Name).IsRequired();
        entity.Property(x => x.Description).IsRequired();
        entity.Property(x => x.Sex).IsRequired();

        entity.HasKey(x => x.Id);
    }
}