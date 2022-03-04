using MusicStore.Shared.Domain.Bus.Event;

namespace MusicStore.EventBus.RabbitMq
{
    public static class RabbitMqQueueNameFormatter
    {
        public static string Format(DomainEventSubscriberInformation information)
        {
            return information.FormatRabbitMqQueueName();
        }

        public static string FormatRetry(DomainEventSubscriberInformation information)
        {
            return $"retry.{Format(information)}";
        }

        public static string FormatDeadLetter(DomainEventSubscriberInformation information)
        {
            return $"dead_letter.{Format(information)}";
        }
    }
}