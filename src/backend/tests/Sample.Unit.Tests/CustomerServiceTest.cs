using AutoFixture.NUnit3;
using AutoFixture;
using NUnit.Framework;
using AutoFixture.Idioms;
using Microsoft.EntityFrameworkCore;
using Sample.Services;
using Sample.DAL;
using Sample.Models.Dtos;

namespace Sample.Unit.Tests;

public class CustomerServiceTest
{
    [Test, CustomAutoData]
    public void Constructor_does_not_accept_nulls_test(GuardClauseAssertion assertion)
    {
        assertion.Verify(typeof(CustomersService).GetConstructors());
    }

    [Test, CustomAutoData]
    public async Task Get_customers_list_should_pass([Frozen] DatabaseContext dbContext, CustomersService sut)
    {
        // ARRANGE
        var customerList = dbContext.Customers.ToArray();

        // ACT
        var result = await sut.GetAll();

        // ASSERTS
        Assert.That(customerList.Length, Is.EqualTo(result.ResultItem.Count));
    }

    [Test, CustomAutoData]
    public async Task Create_customer_should_pass(CustomersService sut, CustomerDto customer)
    {
        // ACT
        var result = await sut.CreateNewItem(customer);

        // ASSERTS
        Assert.That(result.ResultItem.Id, Is.Not.EqualTo(0));
    }

    [Test, CustomAutoData]
    public async Task Edit_customer_should_pass([Frozen] DatabaseContext dbContext, CustomersService sut, IFixture fixture, CustomerDto customer)
    {
        // ARRANGE
        var customerDb = await dbContext.Customers.AsNoTracking().FirstAsync();

        // ACT
        var result = await sut.EditItem(customer, customerDb.Id);

        // ASSERTS
        Assert.That(customer.Name, Is.EqualTo(result.ResultItem.Name));
    }
}