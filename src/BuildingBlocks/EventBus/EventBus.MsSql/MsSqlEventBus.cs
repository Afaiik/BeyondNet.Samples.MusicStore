using Microsoft.EntityFrameworkCore;
using MusicStore.Shared.Domain.Bus.Event;

namespace MusicStore.EventBus.MsSql
{
    public class MsSqlEventBus : IEventBus
    {
        private readonly DbContext _context;

        public MsSqlEventBus(DbContext eventContext)
        {
            _context = eventContext;
        }

        public async Task Publish(List<DomainEvent> events)
        {
            foreach (var domainEvent in events) await Publish(domainEvent);
        }

        private async Task Publish(DomainEvent domainEvent)
        {
            var value = new DomainEventPrimitive
            {
                Id = domainEvent.EventId,
                AggregateId = domainEvent.AggregateId,
                Body = domainEvent.ToPrimitives(),
                Name = domainEvent.EventName(),
                OccurredOn = domainEvent.OccurredOn
            };

            await _context.Set<DomainEventPrimitive>().AddAsync(value);
            await _context.SaveChangesAsync();
        }
    }
}