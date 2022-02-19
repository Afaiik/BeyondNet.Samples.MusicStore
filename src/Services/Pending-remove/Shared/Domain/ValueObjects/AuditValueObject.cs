namespace Shared.Domain.ValueObjects
{
    public class AuditValueObject : ValueObject
    {
        public string UserCreator { get; private set; }
        public DateTime CreatedOn { get; private set; }
        public string UserUpdater { get; private set; }
        public Nullable<DateTime> UpdatedOn { get; private set; }

        private AuditValueObject(string userCreator)
        {
            UserCreator = userCreator;
            CreatedOn = DateTime.UtcNow;
        }

        public static AuditValueObject Create(string userCreator)
        {
            return new AuditValueObject(userCreator);
        }

        public AuditValueObject Update(AuditValueObject audit, string userUpdater)
        {
            audit.UserUpdater = userUpdater;
            audit.UpdatedOn = DateTime.UtcNow;

            return audit;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return UserCreator;
            yield return CreatedOn;
            yield return UserUpdater;
            yield return UpdatedOn;
        }
    }
}
