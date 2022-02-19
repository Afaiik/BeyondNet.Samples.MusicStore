using Shared.Domain.Interfaces;

namespace Catalog.Domain.Albums
{
    public interface IAlbumRepository : IReadRepository<Album, string>, IWriteRepository<Album, string>
    {
    }
}
