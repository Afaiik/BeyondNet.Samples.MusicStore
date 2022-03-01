using MusicStore.Shared.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class Resource : ValueObject
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string Path { get; private set; }
        public bool IsExternal { get; private set; }

        private Resource(string id, string name, string description, string path, bool isExternal)
        {
            Id = id;
            Name = name;
            Description = description;
            Path = path;
            IsExternal = isExternal;
        }

        public static Resource Create(string id, string name, string description, string path, bool isExternal)
        {
            return new Resource(id, name, description, path, isExternal);   
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Id;
            yield return Name;
            yield return Description;
            yield return Path;
            yield return IsExternal;
        }
    }
}
