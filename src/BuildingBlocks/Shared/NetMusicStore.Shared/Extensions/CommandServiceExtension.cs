using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using MusicStore.Shared.Domain.Bus.Command;

namespace MusicStore.Shared.Extensions
{
    public static class CommandServiceExtensions
    {
        public static IServiceCollection AddCommandServices(this IServiceCollection services,
            Assembly assembly)
        {
            var classTypes = assembly.ExportedTypes.Select(t => t.GetTypeInfo()).Where(t => t.IsClass && !t.IsAbstract);

            foreach (var type in classTypes)
            {
                var interfaces = type.ImplementedInterfaces.Select(i => i.GetTypeInfo());

                foreach (var handlerInterfaceType in interfaces.Where(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICommandHandler<>)))
                    services.AddScoped(handlerInterfaceType.AsType(), type.AsType());
            }

            return services;
        }
    }
}