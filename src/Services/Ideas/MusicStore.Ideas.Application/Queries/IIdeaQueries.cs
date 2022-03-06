namespace MusicStore.Ideas.Application.Queries
{
    public interface IIdeaQueries
    {
        Task<Idea> GetIdeaAsync(string id);

        Task<IEnumerable<IdeaSummary>> GetIdeasFromOwner(string ownerId);
    }
}
