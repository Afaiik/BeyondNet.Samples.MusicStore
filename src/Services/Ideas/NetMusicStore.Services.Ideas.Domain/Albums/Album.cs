using NetMusicStore.Services.Shared;
using NetMusicStore.Services.Shared.ValueObjects;
using NetMusicStore.Services.Ideas.Domain.Shared.ValueObjects;
using NetMusicStore.Services.Ideas.Domain.Events;

namespace NetMusicStore.Services.Ideas.Domain.Albums
{
    public class Album : AggregateRoot
    {
        public AggregateId<Album, string> Id { get; private set; }
        public AlbumType Type { get; private set; }
        public AlbumName Name { get; private set; }
        public AlbumDescription Description { get; private set; }
        public Author Author { get; private set; }
        public Audit Audit { get; private set; }
        public EAlbumStatus Status { get; private set; }

        private readonly List<AlbumTag> _tags;
        public IReadOnlyCollection<AlbumTag> Tags => _tags.AsReadOnly();
        
        private readonly List<AlbumSong> _songs;
        public IReadOnlyCollection<AlbumSong> Songs => _songs.AsReadOnly();


        private Album(AggregateId<Album, string> id,
                      AlbumType type,
                      AlbumName name,
                      AlbumDescription description,
                      Author author,
                      List<AlbumTag> tags)
        {
            Id = id;
            Name = name;
            Description = description;
            Author = author;
            Type = type;
            _tags = tags;
            _songs = new List<AlbumSong>();
            Audit =  Audit.Create(author.UserName);
            Status = EAlbumStatus.Pending;

            AddAlbumCreatedDomainEvent(id.Value, type.Description, name.Value, description.Value);
        }

        public void SetType(AlbumType type)
        {
            Type = type;
        }

        private void AddAlbumCreatedDomainEvent(string id, string type, string name, string description)
        {
            var createdEvent = new AlbumCreatedDomainEvent(id, type, name, description);

            AddDomainEvent(createdEvent);
        }

        public static Album Create(AlbumType type,
                                   AlbumName name,
                                   AlbumDescription description,
                                   Author author,
                                   List<AlbumTag> tags)
        {
            var id = AggregateId<Album, string>.From(Guid.NewGuid().ToString());

            return new Album(id, type, name, description, author, tags);
        }

        public void SendToLab()
        {
            if (Status != EAlbumStatus.Pending)
                StatusChangeException(EAlbumStatus.InLab);

            Status = EAlbumStatus.InLab;

            AddDomainEvent(new AlbumSentToLabDomainEvent(Id.Value));
        }

        public void SendToSales()
        {
            if (Status != EAlbumStatus.InLab)
                StatusChangeException(EAlbumStatus.InSales);

            Status = EAlbumStatus.InLab;

            AddDomainEvent(new AlbumSentToSalesDomainEvent(Id.Value));
        }

        public void Cancel()
        {
            if (Status != EAlbumStatus.Pending)
                StatusChangeException(EAlbumStatus.Canceled);

            Status = EAlbumStatus.Canceled;

            AddDomainEvent(new AlbumCanceledDomainEvent(Id.Value));
        }

        public void Close()
        {
            if (Status != EAlbumStatus.InSales)
                StatusChangeException(EAlbumStatus.Closed);

            Status = EAlbumStatus.Closed;

            AddDomainEvent(new AlbumClosedDomainEvent(Id.Value));
        }

        private void StatusChangeException(EAlbumStatus albumStatusToChange)
        {
            throw new AlbumDomainException($"Is not possible to change the order status from {Status.Name} to {albumStatusToChange.Name}.");
        }
    }
}
