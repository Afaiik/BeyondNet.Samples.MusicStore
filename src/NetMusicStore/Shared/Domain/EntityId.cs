using Shared.Domain.ValueObjects;

namespace Shared.Domain
{
    public abstract class EntityId<T> : ValueObject
    {
        protected EntityId()
        {
        }

        protected EntityId(T value)
        {
            if (value == null)
            {
                throw new ArgumentNullException(
                    nameof(value),
                    "The Id cannot be empty");
            }

            Value = value;
        }

        public T Value { get; }

        public static implicit operator T(EntityId<T> self) => self.Value;

        public override string ToString() => Value.ToString();

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class AggregateId<TModel, T> : EntityId<T>
    {
        protected AggregateId(T value):base(value)
        {
        }

        public static AggregateId<TModel, T> From(T value) => new AggregateId<TModel, T>(value);
    }
}
