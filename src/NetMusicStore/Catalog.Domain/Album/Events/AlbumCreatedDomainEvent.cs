using Shared.Domain.Bus.Event;

namespace Catalog.Domain.Events
{
    public class AlbumCreatedDomainEvent : DomainEvent
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int AlbumTypeId { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string[] Tags { get; set; }

        public AlbumCreatedDomainEvent(int albumTypeId, string id, string name, string description, string author, string[] tags)
        {
            AlbumTypeId = albumTypeId;
            Id = id;
            Name = name;
            Description = description;
            Author = author;
            Tags = tags;
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
