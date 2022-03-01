using MusicStore.Shared.ValueObjects;

namespace MusicStore.Ideas.Domain.Shared.ValueObjects
{
    public class Author : ValueObject
    {
        public string Id { get; set; }
        public string Name { get; private set; }
        public string UserName { get; private set; }

        private Author(string id, string name, string userName)
        {
            Id = id;
            Name = name;
            UserName = userName;
        }

        public static Author Create(string id, string name , string userName)
        {
            return new Author(id, name, userName);
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Id;
            yield return Name;
            yield return UserName;
        }
    }
}
