using NetMusicStore.Services.Shared.ValueObjects;

namespace NetMusicStore.Services.Ideas.Domain.Albums
{
    public class AlbumDescription : StringValueObject
    {
        public AlbumDescription(string value) : base(value)
        {
        }
    }
}
