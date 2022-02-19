using NetMusicStore.Shared.Domain.Bus.Event;

namespace NetMusicStore.Ideas.Domain.Albums
{
    public class AlbumDomainException : DomainException
    {
        public AlbumDomainException()
        { }

        public AlbumDomainException(string message)
            : base(message)
        { }

        public AlbumDomainException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}
