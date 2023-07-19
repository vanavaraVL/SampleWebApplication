using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Sample.Models.Dtos;
using Sample.Models.Responses;
using Sample.Services;

namespace Sample.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly ICustomersService _customersService;
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(ILogger<CustomersController> logger, ICustomersService customersService)
    {
        _customersService = customersService;
        _logger = logger;
    }

    [Route("{id:int}")]
    [HttpDelete]
    [Produces("application/json")]
    [ProducesResponseType(typeof(ResponseResultDto<IReadOnlyList<bool>>), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [EnableCors]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _customersService.DeleteItem(id);

        return Ok(result);
    }

    [Route("{id:int}")]
    [HttpPut]
    [Produces("application/json")]
    [ProducesResponseType(typeof(ResponseResultDto<IReadOnlyList<CustomerDto>>), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [EnableCors]
    public async Task<IActionResult> Edit([FromBody] CustomerDto customerDto, int id)
    {
        var result = await _customersService.EditItem(customerDto, id);

        return Ok(result);
    }

    [Route("")]
    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [EnableCors]
    public async Task<IActionResult> Create([FromBody] CustomerDto customerDto)
    {
        var result = await _customersService.CreateNewItem(customerDto);

        return Ok(result);
    }

    [Route("")]
    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [EnableCors]
    public async Task<IActionResult> GetAll()
    {
        var result = await _customersService.GetAll();

        return Ok(result);
    }

    [Route("{id:int}")]
    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(typeof(ResponseResultDto<CustomerDto>), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [EnableCors]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _customersService.GetByIdentity(id);

        return Ok(result);
    }
}