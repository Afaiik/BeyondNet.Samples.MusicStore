﻿namespace MusicStore.Shared.ValueObjects
{
    public class AggregateId<TModel, T> : EntityId<T>
    {
        protected AggregateId(T value) : base(value)
        {
        }

        public static AggregateId<TModel, T> From(T value) => new AggregateId<TModel, T>(value);
    }
}
