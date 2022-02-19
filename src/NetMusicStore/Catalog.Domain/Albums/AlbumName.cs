
using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Albums
{
    public class AlbumName : StringValueObject
    {
        public AlbumName(string value) : base(value)
        {
        }
    }
}
