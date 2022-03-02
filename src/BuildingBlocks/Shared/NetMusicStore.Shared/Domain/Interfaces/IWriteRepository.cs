namespace MusicStore.Shared.Interfaces
{
    public interface IWriteRepository<T, K> where T : sss
    {
        Task Insert(T item);

        Task Update(T item, K id);

        Task Delete(K id);      
    }
}
