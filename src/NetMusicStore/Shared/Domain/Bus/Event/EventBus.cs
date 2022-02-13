namespace Shared.Domain.Bus.Event
{
    public interface EventBus
    {
        Task Publish(List<DomainEvent> events);
    }
}
