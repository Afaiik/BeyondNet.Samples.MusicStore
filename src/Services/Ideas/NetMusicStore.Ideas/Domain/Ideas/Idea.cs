using NetMusicStore.Ideas.Domain.Ideas.Events;
using NetMusicStore.Shared.Domain;
using NetMusicStore.Shared.ValueObjects;

namespace NetMusicStore.Ideas.Domain.Ideas
{
    public class Idea : AggregateRoot
    {
        public AggregateId<Idea, string> Id { get; private set; }
        public IdeaDescription Description { get; private set; }

        private Idea(AggregateId<Idea, string> id, IdeaDescription description) 
        {
            Id = id;
            Description = description;

            AddIdeaCreatedDomainEvent(description.Value);
        }

        public static Idea Create(AggregateId<Idea, string> id, IdeaDescription description)
        {
            return new Idea(id, description);
        }

        private void AddIdeaCreatedDomainEvent(string description)
        {
            var createdEvent = new IdeaCreatedDomainEvent(description);

            AddDomainEvent(createdEvent);
        }

    }
}
