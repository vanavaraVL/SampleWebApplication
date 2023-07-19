using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sample.DAL;
using Sample.DAL.Entities;
using Sample.Models.Dtos;
using Sample.Models.Responses;
using Sample.Services.Exceptions;

namespace Sample.Services;

public interface ICustomersService
{
    Task<ResponseResultDto<IReadOnlyList<CustomerDto>>> GetAll();

    Task<ResponseResultDto<CustomerDto>> GetByIdentity(int id);

    Task<ResponseResultDto<CustomerDto>> CreateNewItem(CustomerDto entityDto);

    Task<ResponseResultDto<CustomerDto>> EditItem(CustomerDto entityDto, int id);

    Task<ResponseResultDto<bool>> DeleteItem(int id);
}

public class CustomersService: ICustomersService
{
    private readonly DatabaseContext _dbContext;
    private readonly IMapper _mapper;

    public CustomersService(DatabaseContext dbContext, 
        IMapper mapper)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<ResponseResultDto<IReadOnlyList<CustomerDto>>> GetAll()
    {
        var entityList = await _dbContext.Customers.AsNoTracking().ToListAsync();

        return new ResponseResultDto<IReadOnlyList<CustomerDto>>()
        {
            ResultItem = _mapper.Map<IReadOnlyList<CustomerDto>>(entityList)
        };
    }

    public async Task<ResponseResultDto<CustomerDto>> GetByIdentity(int id)
    {
        var entity = await GetCustomerById(id);

        return new ResponseResultDto<CustomerDto>()
        {
            ResultItem = _mapper.Map<CustomerDto>(entity)
        };
    }

    public async Task<ResponseResultDto<CustomerDto>> CreateNewItem(CustomerDto entityDto)
    {
        var entity = _mapper.Map<CustomerEntity>(entityDto);

        await _dbContext.Customers.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return new ResponseResultDto<CustomerDto>()
        {
            ResultItem = _mapper.Map<CustomerDto>(entity)
        };
    }

    public async Task<ResponseResultDto<CustomerDto>> EditItem(CustomerDto entityDto, int id)
    {
        var entity = await GetCustomerById(id);

        _mapper.Map(entityDto, entity);

        _dbContext.Customers.Update(entity);

        await _dbContext.SaveChangesAsync();

        return new ResponseResultDto<CustomerDto>()
        {
            ResultItem = _mapper.Map<CustomerDto>(entity)
        };
    }

    public async Task<ResponseResultDto<bool>> DeleteItem(int id)
    {
        var entity = await GetCustomerById(id);

        _dbContext.Customers.Remove(entity);

        await _dbContext.SaveChangesAsync();

        return new ResponseResultDto<bool>()
        {
            ResultItem = true
        };
    }

    private async Task<CustomerEntity> GetCustomerById(int id)
    {
        var entity = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);

        if (entity == null)
        {
            throw new NotFoundException($"Entity with {id} not found", null!);
        }

        return entity;
    }
}