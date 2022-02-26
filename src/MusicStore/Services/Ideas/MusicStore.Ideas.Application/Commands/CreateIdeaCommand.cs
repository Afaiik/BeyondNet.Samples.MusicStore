using MediatR;
using System.Runtime.Serialization;

namespace MusicStore.Ideas.Application.Commands
{
    [DataContract]
    public class CreateIdeaCommand : IRequest<bool>
    {
        [DataMember]
        public string Description { get; private set; }

        public CreateIdeaCommand(string description)
        {
            Description = description;
        }
    }
}
