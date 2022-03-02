using MusicStore.Shared.ValueObjects;

namespace MusicStore.Shared.Domain.Interfaces
{
    public interface IEntity<TType> 
    {
        public EntityId<TType> Id { get; }
    }
}
