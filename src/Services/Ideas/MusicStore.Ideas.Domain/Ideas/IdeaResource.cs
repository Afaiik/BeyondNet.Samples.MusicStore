using MusicStore.Shared.Domain;
using MusicStore.Shared.Domain.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class IdeaResource : Entity
    {
        public EntityId<string> Id { get; }
        public IdeaResourceName Name { get; }
        public IdeaResourcePath Path { get; }
        public IdeaResourceIsExternal IsExternal { get; }
        public IdeaResourceIsShared IsShared { get; private set; }

        private IdeaResource(EntityId<string> id, IdeaResourceName name, IdeaResourcePath path, IdeaResourceIsExternal isExternal) 
        {
            Id = id;
            Name = name;
            Path = path;
            IsExternal = isExternal;
            IsShared = IdeaResourceIsShared.Default;
        }

        public static IdeaResource Create(EntityId<string> id, IdeaResourceName name, IdeaResourcePath path, IdeaResourceIsExternal isExternal)
        {
            return new IdeaResource(id, name, path, isExternal);   
        }

        public void Share()
        {
            IsShared = IdeaResourceIsShared.Create(true);
        }
    }
}
