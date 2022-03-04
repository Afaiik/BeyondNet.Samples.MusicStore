using MusicStore.Shared.Domain;
using MusicStore.Shared.Domain.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class IdeaResource : Entity
    {
        public EntityId<string> Id { get; }
        public string Name { get; }
        public string Path { get; private set; }
        public bool IsExternal { get; set; }

        private IdeaResource(EntityId<string> id, string name, string path, bool isExternal) 
        {
            Id = id;
            Name = name;
            Path = path;
            IsExternal = isExternal;
        }

        public static IdeaResource Create(EntityId<string> id, string name, string path, bool isExternal)
        {
            return new IdeaResource(id, name, path, isExternal);   
        }

    }
}
