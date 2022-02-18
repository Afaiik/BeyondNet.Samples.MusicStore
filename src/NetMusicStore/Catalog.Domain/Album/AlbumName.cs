
using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Album
{
    public class AlbumName : StringValueObject
    {
        public AlbumName(string value) : base(value)
        {
        }
    }
}
