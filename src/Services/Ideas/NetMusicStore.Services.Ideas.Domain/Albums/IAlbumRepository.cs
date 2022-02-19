using NetMusicStore.Services.Shared.Interfaces;

namespace NetMusicStore.Services.Ideas.Domain.Albums
{
    public interface IAlbumRepository : IReadRepository<Album, string>, IWriteRepository<Album, string>
    {
    }
}
