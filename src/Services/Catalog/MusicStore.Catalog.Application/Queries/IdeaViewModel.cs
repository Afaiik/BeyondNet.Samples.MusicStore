namespace MusicStore.Catalog.Application.Queries
{
    public record IdeaModel
    {
        public string Name { get; init;  }
        public string Description { get; init; }
        public string[] Tags { get; init; }
        public ResourceModel[] Resources { get; set; }
    }

    public record ResourceModel
    {
        public string Name { get; init; }
        public string Path { get; init; }
        public bool IsExternal { get; init; }
    }

    public record IdeaSummaryModel
    {
        public string Name { get; init; }
        public string Status { get; set; }
        public int TotalTags { get; init; }
        public int TotalResources { get; init; }
    }
}
