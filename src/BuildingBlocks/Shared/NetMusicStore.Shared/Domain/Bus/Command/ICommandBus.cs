namespace NetMusicStore.Shared.Domain.Bus.Command
{
    public interface ICommandBus
    {
        Task Dispatch(Command command);
    }
}
