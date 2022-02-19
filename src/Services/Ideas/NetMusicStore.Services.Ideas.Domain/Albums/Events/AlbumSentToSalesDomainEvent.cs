using NetMusicStore.Shared.Domain.Bus.Event;

namespace NetMusicStore.Services.Ideas.Domain.Events
{
    public class AlbumSentToSalesDomainEvent : DomainEvent
    {
        public string AlbumId { get; }

        public AlbumSentToSalesDomainEvent(string albumId)
        {
            AlbumId = albumId;
        }

        public override string EventName()
        {
            throw new NotImplementedException();
        }

        public override Dictionary<string, string> ToPrimitives()
        {
            throw new NotImplementedException();
        }

        public override DomainEvent FromPrimitives(string aggregateId, Dictionary<string, string> body, string eventId, string occurredOn)
        {
            throw new NotImplementedException();
        }
    }
}
