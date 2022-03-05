﻿using MusicStore.Shared.Domain.ValueObjects;

namespace MusicStore.Ideas.Domain.Ideas
{
    public class IdeaResourceIsExternal : BoolValueObject
    {
        public IdeaResourceIsExternal(bool value) : base(value)
        {
        }
    }
}