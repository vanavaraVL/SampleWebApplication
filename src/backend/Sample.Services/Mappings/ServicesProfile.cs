using AutoMapper;
using Sample.DAL.Entities;
using Sample.Models.Dtos;

namespace Sample.Services.Mappings;

public class ServicesProfile: Profile
{
    public ServicesProfile()
    {
        CustomerProfile();
    }

    private void CustomerProfile()
    {
        CreateMap<CustomerEntity, CustomerDto>();
        CreateMap<CustomerDto, CustomerEntity>()
            .ForMember(m => m.Id, opt => opt.Ignore());
    }
}