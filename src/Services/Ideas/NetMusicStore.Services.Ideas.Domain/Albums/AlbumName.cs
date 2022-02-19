
using NetMusicStore.Services.Shared.ValueObjects;

namespace NetMusicStore.Services.Ideas.Domain.Albums
{
    public class AlbumName : StringValueObject
    {
        public AlbumName(string value) : base(value)
        {
        }
    }
}
