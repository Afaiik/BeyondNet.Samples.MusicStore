using NetMusicStore.Services.Ideas.Domain.Shared.ValueObjects;
using NetMusicStore.Services.Ideas.Domain.Songs.Events;
using NetMusicStore.Services.Shared;
using NetMusicStore.Services.Shared.ValueObjects;

namespace NetMusicStore.Services.Ideas.Domain.Songs
{
    public class Song : AggregateRoot
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public double Duration { get; private set; }
        public string DurationFormatted { get; private set; }
        public bool Draft { get; private set; }
        public Author Author { get; private set; }

        private List<SongFile> _files;
        public IReadOnlyCollection<SongFile> Files => _files.AsReadOnly();
        public Audit Audit { get; private set; }
        public ESongStatus Status { get; set; }

        private Song(string name, string description, double duration, string durationFormatted, Author author)
        {
            Name = name;
            Description = description;
            Duration = duration;
            DurationFormatted = durationFormatted;
            _files = new List<SongFile>();
            Audit = Audit.Create(author.UserName);
            Status = ESongStatus.Pending;

            AddSongCreatedDomainEvent(Id, name, durationFormatted, Draft, author.UserName);
        }

        private void AddSongCreatedDomainEvent(string id, string name, string durationFormatted, bool isDraft, string author)
        {
            var songCreated = new SongCreatedDomainEvent(id, name, durationFormatted, isDraft, author);

            AddDomainEvent(songCreated);
        }

        public static Song Create(string name, string description, double duration, string durationFormatted, Author author)
        {
            return new Song(name, description, duration, durationFormatted, author);
        }

        public void MarkAsDraft()
        {
            if (Status != ESongStatus.Pending)
                throw new SongDomainException($"Song cannot be marked as draft. Status: {Status.Name}");

            Draft = true;
        }

        public void Promote()
        {
            if (Status != ESongStatus.Pending)
                StatusChangeException(ESongStatus.Promoted);
            if (Duration < 3)
                throw new SongDomainException("A song cannot be promoted if the duration is less than 4 minutes");

            Status = ESongStatus.Promoted;

            AddDomainEvent(new SongPromotedDomainEvent(Id));
        }

        public void Release()
        {
            if (Status != ESongStatus.Promoted)
                StatusChangeException(ESongStatus.Released);

            Status = ESongStatus.Released;

            AddDomainEvent(new SongReleasedDomainEvent(Id));
        }

        public void Cancel() {
            if (Status == ESongStatus.Promoted || Status == ESongStatus.Released || Status == ESongStatus.Canceled)
                StatusChangeException(ESongStatus.Canceled);

            Status = ESongStatus.Canceled;

            AddDomainEvent(new SongCanceledDomainEvent(Id));
        }

        public void AddFile(string name, string path)
        {
            if (ExistsFile(name))
                throw new SongDomainException($"File {name} exists.");

        }

        public void RemoveFile(string name)
        {
            if (!ExistsFile(name))
                throw new SongDomainException($"File {name} does not exists.");
            
           
        }

        private bool ExistsFile(string name)
        {
            return false;
        }

        private void StatusChangeException(ESongStatus songStatusToChange)
        {
            throw new SongDomainException($"Is not possible to change the order status from {Status.Name} to {songStatusToChange.Name}.");
        }
    }
}
