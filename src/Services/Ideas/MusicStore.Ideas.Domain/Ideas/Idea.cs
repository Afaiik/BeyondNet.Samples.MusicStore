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
        public IdeaStatus Status { get; private set; }

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

        public void Draft()
        {
            Status = IdeaStatus.Draft;
        }

        public void UnDraft()
        {
            Status = IdeaStatus.Created;
        }

        public void Close()
        {
            Status = IdeaStatus.Closed;
        }

        public void Cancel()
        {
            Status = IdeaStatus.Canceled;
        }

        public void Promote()
        {
            Status = IdeaStatus.Promoted;

            AddIdeaPromotedDomainEvent(Id.Value);
        }

        public void AddResource(IdeaResourceName name, IdeaResourcePath path, IdeaResourceIsExternal isExternal)
        {
            var resourceId = EntityId<string>.From(Guid.NewGuid().ToString());

            var resource = IdeaResource.Create(resourceId, name, path, isExternal);

            _resources.Add(resource);

            if (isExternal.Value) 
                AddIdeaResourceCreatedDomainEvent(resourceId.Value, name.Value, path.Value, isExternal.Value);
        }

        public void RemoveResource(IdeaResource resource)
        {
            _resources.Remove(resource);
        }

        public void ShareResource(IdeaResource resource)
        {
            resource.Share();

            AddIdeaResourceSharedDomainEvent(resource.Id.Value);
        }


        private void AddIdeaCreatedDomainEvent(string id, string name)
        {
            var createdEvent = new IdeaCreatedDomainEvent(id, name);

            AddDomainEvent(createdEvent);
        }

        private void AddIdeaPromotedDomainEvent(string id)
        {
            var createdEvent = new IdeaPromotedDomainEvent(id);

            AddDomainEvent(createdEvent);
        }

        private void AddIdeaResourceCreatedDomainEvent(string id, string name, string path, bool isExternal)
        {
            var createdEvent = new IdeaResourceCreatedDomainEvent(id, name, path, isExternal);

            AddDomainEvent(createdEvent);
        }

        private void AddIdeaResourceSharedDomainEvent(string id)
        {
            var createdEvent = new IdeaResourceSharedDomainEvent(id);

            AddDomainEvent(createdEvent);
        }

    }
}
