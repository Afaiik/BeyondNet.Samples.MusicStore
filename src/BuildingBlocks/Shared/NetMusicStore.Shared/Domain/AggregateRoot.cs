using MusicStore.Shared.Interfaces;
using MusicStore.Shared.Domain.Bus.Event;

namespace MusicStore.Shared.Domain
{ 
    public abstract class AggregateRoot :  IAggregateRoot
    {
        private List<DomainEvent>? _domainEvents;

        public IReadOnlyCollection<DomainEvent>? DomainEvents => _domainEvents?.AsReadOnly();

        public List<DomainEvent> PullDomainEvents()
        {
            var events = _domainEvents;

            _domainEvents = new List<DomainEvent>();

            return events ?? _domainEvents;
        }

        protected void AddDomainEvent(DomainEvent domainEvent)
        {
            _domainEvents?.Add(domainEvent);
        }

        protected void RemoveDomainEvent(DomainEvent domainEvent)
        {
            _domainEvents?.Remove(domainEvent);
        }

        public void ClearDomainEvents()
        {
            _domainEvents?.Clear();
        }

    }
}
