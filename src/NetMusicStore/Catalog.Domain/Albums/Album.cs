using Catalog.Domain.Aggregates.Songs;
using Catalog.Domain.Events;
using Catalog.Domain.Shared.ValueObjects;
using Shared.Domain;
using Shared.Domain.Bus.Event;
using Shared.Domain.ValueObjects;

namespace Catalog.Domain.Albums
{
    public class Album : AggregateRoot
    {
        public AggregateId<Album, string> Id { get; private set; }
        public AlbumType Type { get; private set; }
        public AlbumName Name { get; private set; }
        public AlbumDescription Description { get; private set; }
        public Author Author { get; private set; }
        public AuditValueObject Audit { get; private set; }
        public EAlbumStatus Status { get; private set; }

        private readonly List<AlbumTag> _tags;
        public IReadOnlyCollection<AlbumTag> Tags => _tags.AsReadOnly();
        
        private readonly List<Song> _songs;
        public IReadOnlyCollection<Song> Songs => _songs.AsReadOnly();


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
            _songs = new List<Song>();
            Audit =  AuditValueObject.Create(author.UserName);
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

        public void AddSong(string name, string description, double duration, List<string> tags, Author author)
        {
            if (ExistsSong(name))
                throw new DomainException($"Song named {name} exists.");

            _songs.Add(Song.Create(name, description, duration, _durationFormatter.Format(duration), tags, author));
        }

        public void RemoveSong(string name)
        {
            if (!ExistsSong(name))
                throw new DomainException($"Song named {name} does not exists.");

            var song = _songs.Find(p => p.Name.ToLower() == name.ToLower());

            _songs.Remove(song);
        }

        private bool ExistsSong(string name)
        {
            return _songs.Exists(p => p.Name.ToLower() == name.ToLower());
        }

        private void StatusChangeException(EAlbumStatus albumStatusToChange)
        {
            throw new AlbumDomainException($"Is not possible to change the order status from {Status.Name} to {albumStatusToChange.Name}.");
        }
    }
}
