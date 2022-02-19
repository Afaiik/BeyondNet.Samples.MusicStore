using NetMusicStore.Shared.ValueObjects;

namespace NetMusicStore.Ideas.Domain.Albums
{
    public class AlbumDescription : StringValueObject
    {
        public AlbumDescription(string value) : base(value)
        {
        }
    }
}
