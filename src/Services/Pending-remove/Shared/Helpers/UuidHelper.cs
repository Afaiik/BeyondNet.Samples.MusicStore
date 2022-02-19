using System;
using System.ComponentModel.DataAnnotations;

namespace Shared.Validator.Attributes
{
    public class UuidHelper : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value,
            ValidationContext validationContext)
        {
            var isValid = Guid.TryParse((string) value, out var result);

            if (isValid) return ValidationResult.Success;

            return new ValidationResult($"The field {value} is not a valid uuid");
        }
    }
}
