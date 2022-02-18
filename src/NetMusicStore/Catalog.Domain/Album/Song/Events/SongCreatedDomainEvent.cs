using Shared.Domain.Bus.Event;

namespace Catalog.Domain.Events
{
    public class SongCreatedDomainEvent : DomainEvent
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        public string Duration { get; private set; }
        public bool IsDraft { get; private set; }
        public string Author { get; private set; }

        public SongCreatedDomainEvent(string id, string name, string duration, bool isDraft, string author)
        {
            Id = id;
            Name = name;
            Duration = duration;
            IsDraft = isDraft;
            Author = author;
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
