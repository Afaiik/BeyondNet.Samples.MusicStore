
using NetMusicStore.Shared.Domain.Bus.Event;

namespace NetMusicStore.Services.Ideas.Domain.Songs.Events
{
    public class SongReleasedDomainEvent : DomainEvent
    {
        public string SongId { get; }

        public SongReleasedDomainEvent(string songId)
        {
            SongId = songId;
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
