using Shared.Domain.FiltersByCriteria;

namespace Shared.Domain.Interfaces
{
    public interface IReadRepository<T, K> where T : IAggregateRoot
    {
        IReadOnlyList<T> Find(Criteria criteria);

        T FindOne(Criteria criteria);

        T FindById(K id);

        bool Exists(Criteria criteria);
    }
}
