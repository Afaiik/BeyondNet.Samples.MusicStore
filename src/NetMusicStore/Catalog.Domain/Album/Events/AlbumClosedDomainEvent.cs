using Shared.Domain.Bus.Event;

namespace Catalog.Domain.Events
{
    public class AlbumClosedDomainEvent : DomainEvent
    {
        public string AlbumId { get; }

        public AlbumClosedDomainEvent(string albumId)
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
