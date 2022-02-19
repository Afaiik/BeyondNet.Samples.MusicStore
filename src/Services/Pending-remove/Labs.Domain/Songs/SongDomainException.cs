using Shared.Domain.Bus.Event;

namespace Catalog.Domain.Songs
{
    public class SongDomainException : DomainException
    {
        public SongDomainException()
        { }

        public SongDomainException(string message)
            : base(message)
        { }

        public SongDomainException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}

