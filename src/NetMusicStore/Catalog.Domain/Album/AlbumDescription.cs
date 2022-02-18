using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Album
{
    public class AlbumDescription : StringValueObject
    {
        public AlbumDescription(string value) : base(value)
        {
        }
    }
}
