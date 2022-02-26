namespace NetMusicStore.Shared.Domain.Bus.Command
{
    public abstract class CommandHandlerWrapper
    {
        public abstract Task Handle(Command command, IServiceProvider provider);
    }

    public class CommandHandlerWrapper<TCommand> : CommandHandlerWrapper
        where TCommand : Command
    {
        public override async Task Handle(Command domainEvent, IServiceProvider provider)
        {
            var handler = (ICommandHandler<TCommand>)provider.GetService(typeof(ICommandHandler<TCommand>));

            await handler.Handle((TCommand)domainEvent);
        }
    }
}
