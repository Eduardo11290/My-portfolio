using System.ComponentModel.DataAnnotations;

namespace Portfolio.BusinessLogic.DTOs.Contact
{
    public class ContactCreateDTO
    {
        [Required, MaxLength(120)]
        public string Name { get; set; } = null!;

        [Required, EmailAddress, MaxLength(200)]
        public string Email { get; set; } = null!;

        [Required, MaxLength(5000)]
        public string Message { get; set; } = null!;
    }
}
