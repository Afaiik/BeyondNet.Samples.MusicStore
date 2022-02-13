namespace Catalog.Domain.Aggregates.AlbumAggregate
{
    public class AlbumType
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public AlbumType(string description)
        {
            Description = description;
        }
    }
}
