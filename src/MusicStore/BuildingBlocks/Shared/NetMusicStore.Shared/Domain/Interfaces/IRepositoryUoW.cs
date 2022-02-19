
namespace NetMusicStore.Shared.Interfaces
{
    public interface IRepositoryUoW
    {
        IUnitOfWork UnitOfWork { get; }      
    }
}
