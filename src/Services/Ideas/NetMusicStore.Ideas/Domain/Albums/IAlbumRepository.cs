using NetMusicStore.Shared.Interfaces;

namespace NetMusicStore.Ideas.Domain.Albums
{
    public interface IAlbumRepository : IReadRepository<Album, string>, IWriteRepository<Album, string>
    {
    }
}
