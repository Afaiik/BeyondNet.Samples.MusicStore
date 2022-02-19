using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Albums
{
    public class AlbumType :  ValueObject
    {
        public int Id { get; private set; }
        public string Description { get; private set; }

        private AlbumType(int id, string description)
        {
            Id = id;

            Guard(description);

            Description = description;
        }

        private void Guard(string value)
        {
            if (string.IsNullOrEmpty(value))
                throw new ArgumentNullException(nameof(value));
        }

        public static AlbumType Create(int id, string description)
        {
            return new AlbumType(id, description);  
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Id;
            yield return Description;
        }
    }
}
