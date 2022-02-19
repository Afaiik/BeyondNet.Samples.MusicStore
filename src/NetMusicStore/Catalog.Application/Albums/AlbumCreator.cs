using Catalog.Domain.Albums;
using Catalog.Domain.Shared.ValueObjects;
using Shared.Domain.Bus.Event;

namespace Catalog.Application.Albums
{
    public class AlbumCreator
    {
        private readonly IAlbumRepository _repository;
        private readonly EventBus _eventBus;

        public AlbumCreator(IAlbumRepository repository, EventBus eventBus) 
        {
            _repository = repository;
            _eventBus = eventBus;
        }

        public async Task Create(AlbumType type,
                                 AlbumName name,
                                 AlbumDescription description,
                                 Author author,
                                 List<AlbumTag> tags)
        {
            var album = Album.Create(type, name, description, author, tags);

            await _repository.Insert(album);

            await _eventBus.Publish(album.PullDomainEvents());
        }
    }
}
