using MusicStore.Shared.Interfaces;

namespace MusicStore.Ideas.Domain.Ideas
{
    public interface IIdeaRepository : IReadRepository<Idea, string>, IWriteRepository<Idea, string>
    {
    }
}
