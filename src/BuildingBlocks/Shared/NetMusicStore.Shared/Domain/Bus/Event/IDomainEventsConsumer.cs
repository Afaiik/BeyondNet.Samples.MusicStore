namespace NetMusicStore.Shared.Domain.Bus.Event
{
    public interface IDomainEventsConsumer
    {
        Task Consume();
    }
}
