using System;

namespace NetMusicStore.Services.Ideas.Application.Services
{
    public class MinutesDurationFormatter : IDurationFormatter
    {
        public string Format(double duration)
        {
            return TimeSpan.FromHours(duration).ToString("h\\:mm");
        }
    }
}
