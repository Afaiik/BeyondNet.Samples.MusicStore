namespace MusicStore.Catalog.Application.Commands
{
    public record CreateIdeaCommand(string name, string description, List<string> tags, List<Resource> resources) : IRequest<bool>;

    public record Resource
    {
        public string Name { get; init; }

        public string Path { get; init; }

        public bool IsExternal { get; init; }

        public bool IsShared { get; init; }
    }
}
