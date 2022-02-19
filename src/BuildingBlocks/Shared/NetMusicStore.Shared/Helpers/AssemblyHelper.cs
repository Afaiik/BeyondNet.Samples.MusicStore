using System.Collections.Concurrent;
using System.Reflection;

namespace NetMusicStore.Shared.Helpers
{
    public static class AssemblyHelper
    {
        private static readonly ConcurrentDictionary<string, Assembly> _assemblies =
            new ConcurrentDictionary<string, Assembly>();

        public static Assembly GetInstance(string key)
        {
            return _assemblies.GetOrAdd(key, Assembly.Load(key));
        }
    }

    public static class Assemblies
    {
        public const string MusicStore = "NetMusicStore.MusicStore";
        public const string Backoffice = "NetMusicStore.Backoffice";
    }
}
