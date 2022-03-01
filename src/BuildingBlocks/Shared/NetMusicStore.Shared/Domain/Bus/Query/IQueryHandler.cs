namespace MusicStore.Shared.Domain.Bus.Query
{
    public interface IQueryHandler<TQuery, TResponse> where TQuery : Query
    {
        Task<TResponse> Handle(TQuery query);
    }
}
