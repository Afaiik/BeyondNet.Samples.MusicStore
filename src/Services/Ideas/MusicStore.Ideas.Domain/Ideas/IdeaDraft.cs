namespace MusicStore.Ideas.Domain.Ideas
{
    public class IdeaDraft : BoolValueObject
    {
        private IdeaDraft(bool value) : base(value)
        {
        }

        public static IdeaDraft Default => Create(false);

        public static IdeaDraft Create(bool value)
        {
            return new IdeaDraft(value);
        }
    }
}
