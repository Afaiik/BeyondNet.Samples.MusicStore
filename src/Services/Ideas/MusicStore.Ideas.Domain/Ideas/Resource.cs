using MusicStore.Shared.Domain;
using MusicStore.Shared.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class Resource : Entity<string>
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string Path { get; private set; }
        public bool IsExternal { get; private set; }

        private Resource(EntityId<string> id, string name, string description, string path, bool isExternal) :  base(id)
        {
            Name = name;
            Description = description;
            Path = path;
            IsExternal = isExternal;
        }

        public static Resource Create(EntityId<string> id, string name, string description, string path, bool isExternal)
        {
            return new Resource(id, name, description, path, isExternal);   
        }
    
    }
}
