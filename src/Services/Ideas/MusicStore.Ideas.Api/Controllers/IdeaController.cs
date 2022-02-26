using MediatR;
using Microsoft.AspNetCore.Mvc;
using MusicStore.Ideas.Application.Commands;

namespace MusicStore.Ideas.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdeaController : ControllerBase
    {
        private readonly IMediator _mediator;

        public IdeaController(IMediator mediator)
        {
            this._mediator = mediator;
        }
        
        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] CreateIdeaCommand createIdeaCommand)
        {
            return await _mediator.Send(createIdeaCommand);
        }
    }
}
