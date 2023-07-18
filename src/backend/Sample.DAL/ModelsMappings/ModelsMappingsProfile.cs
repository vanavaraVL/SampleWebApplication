using Microsoft.EntityFrameworkCore;

namespace Sample.DAL.ModelsMappings;

public static class ModelsMappingsProfile
{
    private static readonly List<IModelMapping> ModelMappings;

    static ModelsMappingsProfile()
    {
        ModelMappings = new List<IModelMapping>();
        var type = typeof(IModelMapping);
        var types = typeof(ModelsMappingsProfile).Assembly
            .GetTypes()
            .Where(p => type.IsAssignableFrom(p) && p != type)
            .Distinct()
            .ToList();

        foreach (var t in types)
        {
            ModelMappings.Add((IModelMapping)Activator.CreateInstance(t));
        }
    }

    public static void Map(ModelBuilder modelBuilder)
    {
        foreach (var modelMapping in ModelMappings)
        {
            modelMapping.Map(modelBuilder);
        }
    }
}