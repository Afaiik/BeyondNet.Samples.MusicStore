
using NetMusicStore.Shared.ValueObjects;

namespace NetMusicStore.Ideas.Domain.Albums
{
    public class AlbumName : StringValueObject
    {
        public AlbumName(string value) : base(value)
        {
        }
    }
}
