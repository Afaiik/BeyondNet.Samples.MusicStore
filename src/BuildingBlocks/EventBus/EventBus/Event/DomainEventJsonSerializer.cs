using NetMusicStore.Shared.Domain.Bus.Event;
using System.Text.Json;

namespace NetMusicStore.EventBus.Event
{
    public static class DomainEventJsonSerializer
    {
        public static string Serialize(DomainEvent domainEvent)
        {
            if (domainEvent == null) return "";

            var attributes = domainEvent.ToPrimitives();

            attributes.Add("id", domainEvent.AggregateId);

            return JsonSerializer.Serialize(new Dictionary<string, Dictionary<string, object>>
            {
                {
                    "data", new Dictionary<string, object>
                    {
                        {"id", domainEvent.EventId},
                        {"type", domainEvent.EventName()},
                        {"occurred_on", domainEvent.OccurredOn},
                        {"attributes", attributes}
                    }
                },
                {"meta", new Dictionary<string, object>()}
            });
        }
    }
}
