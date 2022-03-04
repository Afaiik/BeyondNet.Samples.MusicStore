using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MusicStore.Shared.Domain.Bus.Event;
using MusicStore.EventBus.Event;

namespace SMusicStore.EventBus.MsSql
{
    public class MsSqlDomainEventsConsumer : IDomainEventsConsumer
    {
        private const int Chunk = 200;
        private readonly InMemoryApplicationEventBus _bus;
        private readonly DbContext _context;
        private readonly DomainEventsInformation _domainEventsInformation;

        public MsSqlDomainEventsConsumer(InMemoryApplicationEventBus bus,
            DomainEventsInformation domainEventsInformation,
            DbContext context)
        {
            _bus = bus;
            _domainEventsInformation = domainEventsInformation;
            _context = context;
        }

        public async Task Consume()
        {
            var domainEvents = _context.Set<DomainEventPrimitive>().Take(Chunk).ToList();

            foreach (var domainEvent in domainEvents) await ExecuteSubscribers(domainEvent);
        }

        private async Task ExecuteSubscribers(DomainEventPrimitive domainEventPrimitive)
        {
            var domainEventType = _domainEventsInformation.ForName(domainEventPrimitive.Name);

            var instance = (DomainEvent) Activator.CreateInstance(domainEventType);

            var result = (DomainEvent) domainEventType
                .GetTypeInfo()
                .GetDeclaredMethod(nameof(DomainEvent.FromPrimitives))
                .Invoke(instance, new object[]
                {
                    domainEventPrimitive.AggregateId,
                    domainEventPrimitive.Body,
                    domainEventPrimitive.Id,
                    domainEventPrimitive.OccurredOn
                });

            await _bus.Publish(new List<DomainEvent> {result});

            _context.Set<DomainEventPrimitive>().Remove(domainEventPrimitive);
            _context.SaveChanges();
        }
    }
}