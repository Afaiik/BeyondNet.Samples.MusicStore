namespace MusicStore.Shared.Domain.Bus.Query
{
    public interface IQueryBus
    {
        Task<TResponse> Ask<TResponse>(Query request);
    }
}
