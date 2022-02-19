using NetMusicStore.Shared.ValueObjects;

namespace NetMusicStore.Ideas.Domain.Albums
{
    public class AlbumSong : ValueObject
    {
        public string Name { get; private set; }
        public string Description { get; private set; }

        private AlbumSong(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public static AlbumSong Create(string name, string description)
        {
            return new AlbumSong(name, description);
        } 

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Name;
            yield return Description;
        }
    }
}
