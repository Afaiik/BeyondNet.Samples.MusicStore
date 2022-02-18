namespace Shared.Domain.Interfaces
{
    public interface IWriteRepository<T, K> where T : IAggregateRoot
    {
        void Insert(T item);

        void Update(T item, K id);

        void Delete(K id);      
    }
}
