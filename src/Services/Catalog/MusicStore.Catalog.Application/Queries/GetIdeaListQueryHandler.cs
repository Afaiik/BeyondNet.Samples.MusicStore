namespace MusicStore.Catalog.Application.Queries
{
    public class GetIdeaListQueryHandler : IRequestHandler<GetIdeaListQuery, List<Idea>>
    {
        private readonly IIdeaRepository repository;

        public GetIdeaListQueryHandler(IIdeaRepository repository)
        {
            this.repository = repository;
        }

        public Task<List<Idea>> Handle(GetIdeaListQuery request, CancellationToken cancellationToken)
        {
            var result = new List<Idea>();

            var domainData = repository.Find();

            return Task.FromResult(result);
        }
    }
}
