using Shared.Domain.Interfaces;

namespace Shared.Infrastructure
{
    public class CSharpUuidGenerator : IUuidGenerator
    {
        public string Generate()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
