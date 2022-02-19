using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Albums
{
    public class AlbumTag : ValueObject
    {
        public string Name { get; private set; }


        private AlbumTag(string name)
        {
            Guard(name);

            this.Name = name;
        }

        private void Guard(string value)
        {
            if (string.IsNullOrEmpty(value)) 
                throw new ArgumentNullException(nameof(value));
        }

        public static AlbumTag Create(string name)
        {
            return new AlbumTag(name);
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Name;
        }
    }
}
