using System.ComponentModel;

namespace Shared.Domain.ValueObjects
{
    public abstract class EntityId<T> : ValueObject
    {
        public T Value { get; }

        public EntityId(T value)
        {
            Guard(value);

            Value = value;
        }

        private void Guard(T value)
        {
            if (value == null)
                throw new InvalidEnumArgumentException($"{value} cannot be null");
        }

        public override string ToString()
        {
            return Value.ToString();
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Value;
        }

        public override bool Equals(object obj)
        {
            if (this == obj) return true;

            var item = obj as EntityId<T>;

            if (item == null) return false;

            return Value?.ToString() == item.Value?.ToString();
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Value);
        }
    }    
}
