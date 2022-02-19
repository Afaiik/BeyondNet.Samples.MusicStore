using NetMusicStore.Services.Shared.ValueObjects;

namespace NetMusicStore.Services.Shared.FiltersByCriteria
{
    public class OrderBy : StringValueObject
    {
        public OrderBy(string value) : base(value)
        {
        }
    }
}
