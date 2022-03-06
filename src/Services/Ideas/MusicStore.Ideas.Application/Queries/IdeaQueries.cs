namespace MusicStore.Ideas.Application.Queries
{
    public class IdeaQueries : IIdeaQueries
    {
        public Task<Idea> GetIdeaAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IdeaSummary>> GetIdeasFromOwner(string ownerId)
        {
            throw new NotImplementedException();
        }
    }
}
