namespace MusicStore.Ideas.Application.Commands
{
    [DataContract]
    public class CreateIdeaCommand : IRequest<bool>
    {
        [DataMember]
        public string Name { get; }

        [DataMember]
        public string Description { get; }

        [DataMember]
        private readonly List<string> _tags;

        [DataMember]
        public IEnumerable<string> Tags => _tags.AsReadOnly();

        [DataMember]
        private readonly List<Resource> _resources;

        [DataMember]
        public IEnumerable<Resource> Resources => _resources.AsReadOnly();


        private CreateIdeaCommand()
        {
            _resources = new List<Resource>();
        }

        public CreateIdeaCommand(string name, string description, List<string> tags, List<Resource> resources) : this()
        {
            Name = name;
            Description = description;
            _tags = tags;
            _resources = resources;
        }

    }

    public record Resource
    {
        public string Name { get; init; }

        public string Path { get; init; }

        public bool IsExternal { get; init; }

        public bool IsShared { get; init; }
    }
}
