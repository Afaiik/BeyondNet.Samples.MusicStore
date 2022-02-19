using NetMusicStore.Services.Ideas.Domain.Albums;
using NetMusicStore.Services.Ideas.Domain.Shared.ValueObjects;
using NetMusicStore.Shared.Domain.Bus.Event;

namespace NetMusicStore.Services.Ideas.Application.Albums
{
    public class AlbumCreator
    {
        private readonly IAlbumRepository _repository;
        private readonly IEventBus _eventBus;

        public AlbumCreator(IAlbumRepository repository, IEventBus eventBus) 
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
