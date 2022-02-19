
namespace NetMusicStore.Services.Shared.Interfaces
{
    public interface IRepositoryUoW
    {
        IUnitOfWork UnitOfWork { get; }      
    }
}
