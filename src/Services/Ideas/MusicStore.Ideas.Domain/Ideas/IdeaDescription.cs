﻿using MusicStore.Shared.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class IdeaDescription : StringValueObject
    {
        private IdeaDescription(string value) : base(value)
        {
        }

        public static IdeaDescription Create(string value)
        {
            return new IdeaDescription(value);
        }
    }
}