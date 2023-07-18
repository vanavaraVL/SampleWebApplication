using Microsoft.EntityFrameworkCore;

namespace Sample.DAL.ModelsMappings;

internal interface IModelMapping
{
    void Map(ModelBuilder modelBuilder);
}