using MusicStore.Shared.Domain.Interfaces;
using MusicStore.Shared.Domain.Bus.Event;
using MusicStore.Shared.ValueObjects;

namespace MusicStore.Shared.Domain
{ 
    public abstract class AggregateRoot<TObject, TType> :  IAggregateRoot<TObject, TType>
    {
        public AggregateId<TObject, TType> Id { get; }

        private List<DomainEvent>? _domainEvents;


        public AggregateRoot(AggregateId<TObject, TType> id)
        {
            Id = id;
        }

        public IReadOnlyCollection<DomainEvent>? DomainEvents => _domainEvents?.AsReadOnly();

        public List<DomainEvent> PullDomainEvents()
        {
            var events = _domainEvents;

            _domainEvents = new List<DomainEvent>();

            return events ?? _domainEvents;
        }


        public void ClearDomainEvents()
        {
            _domainEvents?.Clear();
        }

        public void AddDomainEvent(DomainEvent domainEvent)
        {
            _domainEvents?.Add(domainEvent);
        }

        public void RemoveDomainEvent(DomainEvent domainEvent)
        {
            _domainEvents?.Remove(domainEvent);
        }
    }
}
