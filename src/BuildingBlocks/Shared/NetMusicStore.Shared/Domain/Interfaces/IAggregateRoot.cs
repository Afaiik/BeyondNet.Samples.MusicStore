using MusicStore.Shared.Domain.Bus.Event;
using MusicStore.Shared.ValueObjects;

namespace MusicStore.Shared.Domain.Interfaces
{
    public interface IAggregateRoot<TObject, TType>
    {
        public AggregateId<TObject, TType> Id { get; }

        List<DomainEvent> PullDomainEvents();

        void AddDomainEvent(DomainEvent domainEvent);

        void RemoveDomainEvent(DomainEvent domainEvent);

        void ClearDomainEvents();
    }
}
