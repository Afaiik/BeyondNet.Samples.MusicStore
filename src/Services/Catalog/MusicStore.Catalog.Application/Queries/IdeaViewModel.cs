namespace MusicStore.Catalog.Application.Queries
{
    public record Idea
    {
        public string Name { get; init;  }
        public string Description { get; init; }
        public string[] Tags { get; init; }
        public Resource[] Resources { get; set; }
    }

    public record Resource
    {
        public string Name { get; init; }
        public string Path { get; init; }
        public bool IsExternal { get; init; }
    }

    public record IdeaSummary
    {
        public string Name { get; init; }
        public string Status { get; set; }
        public int TotalTags { get; init; }
        public int TotalResources { get; init; }
    }
}
