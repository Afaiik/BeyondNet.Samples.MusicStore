﻿using NetMusicStore.Services.Shared.FiltersByCriteria;

namespace NetMusicStore.Services.Shared.Interfaces
{
    public interface IReadRepository<T, K> where T : IAggregateRoot
    {
        Task<IReadOnlyList<T>> Find(Criteria criteria);

        Task<T> FindOne(Criteria criteria);

        Task<T> FindById(K id);

        Task<bool> Exists(Criteria criteria);
    }
}