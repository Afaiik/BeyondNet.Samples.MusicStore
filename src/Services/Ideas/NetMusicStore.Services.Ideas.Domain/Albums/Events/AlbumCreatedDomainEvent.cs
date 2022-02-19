using NetMusicStore.Shared.Domain.Bus.Event;

namespace NetMusicStore.Services.Ideas.Domain.Events
{
    public class AlbumCreatedDomainEvent : DomainEvent
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public AlbumCreatedDomainEvent(string id, string type, string name, string description)
        {
            Id = id;
            Type = type;
            Name = name;
            Description = description;
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
