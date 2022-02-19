namespace NetMusicStore.Shared.Domain.Bus.Event
{
    public interface IDomainEventSubscriberBase
    {
        Task On(DomainEvent @event);
    }
}
