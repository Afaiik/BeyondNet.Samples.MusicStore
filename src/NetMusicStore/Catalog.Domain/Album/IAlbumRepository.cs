using Shared.Domain.Interfaces;

namespace Catalog.Domain.Aggregates.AlbumAggregate
{
    public interface IAlbumRepository : IReadRepository<Album, string>, IWriteRepository<Album, string>
    {
    }
}
