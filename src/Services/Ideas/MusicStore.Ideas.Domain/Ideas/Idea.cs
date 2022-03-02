using MusicStore.Ideas.Domain.Ideas.Events;
using MusicStore.Ideas.Domain.Shared.ValueObjects;
using MusicStore.Shared.Domain;
using MusicStore.Shared.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class Idea : AggregateRoot<Idea, string>
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public IReadOnlyList<Tag> Tags { get; private set; }
        public IReadOnlyList<Resource> Resources { get; private set; }
        public bool IsDraft { get; private set; }
        public IdeaStatus Status { get; private set; }

        private Idea(AggregateId<Idea, string> id, string name, string description, IReadOnlyList<Tag> tags) : base(id)
        {
            Name = name;
            Description = description;
            IsDraft = false;
            Tags = tags;
            Resources = new List<Resource>();
            Status = IdeaStatus.Created;
            
            AddIdeaCreatedDomainEvent(Id.Value, Name);
        }

        public static Idea Create(AggregateId<Idea, string> id, string name, string description, IReadOnlyList<Tag> tags)
        {
            return new Idea(id, name, description, tags);
        }

        private void AddIdeaCreatedDomainEvent(string id, string name)
        {
            var createdEvent = new IdeaCreatedDomainEvent(id, name);

            AddDomainEvent(createdEvent);
        }

    }
}
