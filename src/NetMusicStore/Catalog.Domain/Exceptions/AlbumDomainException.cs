using Shared.Domain.Bus.Event;
using System;

namespace Catalog.Domain.Exceptions
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
