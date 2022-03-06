namespace MusicStore.Ideas.Application.Queries
{
    public record GetIdeaListQuery() : IRequest<List<Idea>>;
}
