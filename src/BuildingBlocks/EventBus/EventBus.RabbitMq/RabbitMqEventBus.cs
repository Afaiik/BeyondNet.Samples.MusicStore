using RabbitMQ.Client.Exceptions;
using MusicStore.Shared.Domain.Bus.Event;
using MusicStore.EventBus.MsSql;
using MusicStore.EventBus.Event;

namespace MusicStore.EventBus.RabbitMq
{
    public class RabbitMqEventBus : IEventBus
    {
        private readonly string _exchangeName;
        private readonly MsSqlEventBus _failOverPublisher;
        private readonly RabbitMqPublisher _rabbitMqPublisher;

        public RabbitMqEventBus(RabbitMqPublisher rabbitMqPublisher, MsSqlEventBus failOverPublisher,
            string exchangeName = "domain_events")
        {
            _rabbitMqPublisher = rabbitMqPublisher;
            _failOverPublisher = failOverPublisher;
            _exchangeName = exchangeName;
        }

        public async Task Publish(List<DomainEvent> events)
        {
            events.ForEach(async e => await Publish(e));
        }

        private async Task Publish(DomainEvent domainEvent)
        {
            try
            {
                var serializedDomainEvent = DomainEventJsonSerializer.Serialize(domainEvent);
                _rabbitMqPublisher.Publish(_exchangeName, domainEvent.EventName(), serializedDomainEvent);
            }
            catch (RabbitMQClientException e)
            {
                await _failOverPublisher.Publish(new List<DomainEvent> {domainEvent});
            }
        }
    }
}
