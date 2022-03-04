using MusicStore.Ideas.Domain.Ideas.Events;
using MusicStore.Ideas.Domain.Shared.ValueObjects;
using MusicStore.Shared.Domain;
using MusicStore.Shared.Domain.ValueObjects;
using MusicStore.Shared.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class Idea : AggregateRoot
    {
        public AggregateId<Idea, string> Id { get; }
        public IdeaName Name { get; }
        public IdeaDescription Description { get; }
        public IReadOnlyList<Tag> Tags { get; }

        private List<IdeaResource> _resources;
        public IReadOnlyList<IdeaResource> Resources => _resources.AsReadOnly();

        public IdeaDraft IsDraft { get; }
        public IdeaStatus Status { get; }

        private Idea(AggregateId<Idea, string> id, IdeaName name, IdeaDescription description, IReadOnlyList<Tag> tags) 
        {
            Id = id;
            Name = name;
            Description = description;
            IsDraft = IdeaDraft.Default;
            Tags = tags;
            Status = IdeaStatus.Created;

            _resources = new List<IdeaResource>();

            AddIdeaCreatedDomainEvent(Id.Value, Name.Value);
        }

        public static Idea Create(AggregateId<Idea, string> id, IdeaName name, IdeaDescription description, IReadOnlyList<Tag> tags)
        {
            return new Idea(id, name, description, tags);
        }

        public void AddResource(string name, string path, bool isExternal)
        {
            var resourceId = EntityId<string>.From(Guid.NewGuid().ToString());

            var resource = IdeaResource.Create(resourceId, name, path, isExternal);

            _resources.Add(resource);

            AddIdeaResourceCreatedDomainEvent(resourceId.Value, name, path, isExternal);
        }

        private void AddIdeaCreatedDomainEvent(string id, string name)
        {
            var createdEvent = new IdeaCreatedDomainEvent(id, name);

            AddDomainEvent(createdEvent);
        }

        private void AddIdeaResourceCreatedDomainEvent(string id, string name, string path, bool isExternal)
        {
            var createdEvent = new IdeaResourceCreatedDomainEvent(id, name, path, isExternal);

            AddDomainEvent(createdEvent);
        }

    }
}
