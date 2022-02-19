using System;
using System.Collections;
using System.Collections.Concurrent;
using NetMusicStore.Shared.Domain.Bus.Query;


namespace Shared.Infrastructure.Bus.Query
{
    public class InMemoryQueryBus : IQueryBus
    {
        private static readonly ConcurrentDictionary<Type, object> _queryHandlers =
            new ConcurrentDictionary<Type, object>();

        private readonly IServiceProvider _provider;

        public InMemoryQueryBus(IServiceProvider provider)
        {
            _provider = provider;
        }

        public async Task<TResponse> Ask<TResponse>(NetMusicStore.Shared.Domain.Bus.Query.Query query)
        {
            var handler = GetWrappedHandlers<TResponse>(query);

            if (handler == null) throw new QueryNotRegisteredError(query);

            return await handler.Handle(query, _provider);
        }

        private QueryHandlerWrapper<TResponse> GetWrappedHandlers<TResponse>(NetMusicStore.Shared.Domain.Bus.Query.Query query)
        {
            Type[] typeArgs = {query.GetType(), typeof(TResponse)};

            var handlerType = typeof(IQueryHandler<,>).MakeGenericType(typeArgs);
            var wrapperType = typeof(QueryHandlerWrapper<,>).MakeGenericType(typeArgs);

            var handlers =
                (IEnumerable) _provider.GetService(typeof(IEnumerable<>).MakeGenericType(handlerType));

            var wrappedHandlers = (QueryHandlerWrapper<TResponse>) _queryHandlers.GetOrAdd(query.GetType(),
                handlers.Cast<object>()
                    .Select(handler => (QueryHandlerWrapper<TResponse>) Activator.CreateInstance(wrapperType))
                    .FirstOrDefault());

            return wrappedHandlers;
        }
    }
}
