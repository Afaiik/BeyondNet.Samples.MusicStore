using MediatR;

namespace MusicStore.Ideas.Application.Commands
{

    public class CreateIdeaCommandHandler : IRequestHandler<CreateIdeaCommand, bool>
    {
        private readonly IMediator _mediator;

        public CreateIdeaCommandHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public Task<bool> Handle(CreateIdeaCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}

