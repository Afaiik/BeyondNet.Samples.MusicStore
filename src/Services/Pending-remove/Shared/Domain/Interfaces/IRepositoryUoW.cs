
namespace Shared.Domain.Interfaces
{
    public interface IRepositoryUoW
    {
        IUnitOfWork UnitOfWork { get; }      
    }
}
