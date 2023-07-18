using AutoFixture.AutoMoq;
using AutoFixture.Kernel;
using AutoFixture.NUnit3;
using AutoFixture;
using AutoMapper;
using EntityFrameworkCore.AutoFixture.Core;
using EntityFrameworkCore.AutoFixture.InMemory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sample.Services.Mappings;
using Sample.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Sample.DAL;

namespace Sample.Unit.Tests
{
    [AttributeUsage(AttributeTargets.Method)]
    public class CustomAutoDataAttribute : AutoDataAttribute
    {
        public CustomAutoDataAttribute() : base(FixtureHelpers.CreateFixture)
        {
        }
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class CustomInlineAutoDataAttribute : InlineAutoDataAttribute
    {
        public CustomInlineAutoDataAttribute(params object[] args) : base(FixtureHelpers.CreateFixture, args)
        {
        }
    }

    internal static class FixtureHelpers
    {
        public static IFixture CreateFixture()
        {
            var fixture = new Fixture();

            fixture.Customize(new AutoMoqCustomization
            {
                ConfigureMembers = true,
                GenerateDelegates = true
            });

            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            fixture.Customizations.Add(new TypeRelay(typeof(IReadOnlySet<>), typeof(HashSet<>)));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ServicesProfile());
            });
            fixture.Register<IMapper>(() => new Mapper(config));


            fixture.Customize(new InMemoryCustomization
            {
                UseUniqueNames = false,
                OnCreate = OnCreateAction.EnsureCreated,
                DatabaseName = "TestContext"
            });
            
            return fixture;
        }
    }
}
