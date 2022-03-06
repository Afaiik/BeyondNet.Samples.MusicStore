﻿using IdeaModel = MusicStore.Catalog.Application.Queries.Idea;

namespace MusicStore.Catalog.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class IdeaController : ControllerBase
    {
        private readonly IMediator _mediator;

        public IdeaController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<IdeaModel>>> Get()
        {
            var data = await _mediator.Send(new GetIdeaListQuery());

            return Ok();
        }
        
        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] CreateIdeaCommand createIdeaCommand)
        {
            return await _mediator.Send(createIdeaCommand);
        }
    }
}