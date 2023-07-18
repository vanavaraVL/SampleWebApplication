using Sample.DAL.Entities;

namespace Sample.Models.Dtos;

public record CustomerDto(int Id, string Name, string Description, CustomerSex Sex);