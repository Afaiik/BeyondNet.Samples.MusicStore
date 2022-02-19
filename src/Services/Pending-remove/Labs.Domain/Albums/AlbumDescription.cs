using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Albums
{
    public class AlbumDescription : StringValueObject
    {
        public AlbumDescription(string value) : base(value)
        {
        }
    }
}
