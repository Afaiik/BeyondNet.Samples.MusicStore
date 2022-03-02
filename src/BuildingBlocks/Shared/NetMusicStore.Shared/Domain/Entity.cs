using MusicStore.Shared.Domain.Interfaces;
using MusicStore.Shared.ValueObjects;

namespace MusicStore.Shared.Domain
{
    public abstract class Entity<TType> : IEntity<TType>
    {
        public EntityId<TType> Id { get; private set; }


        public Entity(EntityId<TType> id)
        {
            Id = id;
        }

        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is Entity<TType>))
                return false;

            if (Object.ReferenceEquals(this, obj))
                return true;

            if (this.GetType() != obj.GetType())
                return false;

            Entity<TType> item = (Entity<TType>)obj;

            return item.Id == this.Id;
        }

        public override int GetHashCode()
        {
           return base.GetHashCode();
        }

        public static bool operator ==(Entity<TType> left, Entity<TType> right)
        {
            if (Object.Equals(left, null))
                return (Object.Equals(right, null)) ? true : false;
            else
                return left.Equals(right);
        }

        public static bool operator !=(Entity<TType> left, Entity<TType> right)
        {
            return !(left == right);
        }

    }
}
