using Shared.Domain.Interfaces;

namespace Shared.Infrastructure
{
    public sealed class CSharpRandomNumberGenerator : IRandomNumberGenerator
    {
        private readonly Random _random = new Random();

        public int Generate()
        {
            return _random.Next(1, 5);
        }
    }
}
