using System.ComponentModel.DataAnnotations;

namespace Portfolio.BusinessLogic.DTOs.Recommendation
{
    public class RecommendationCreateDTO
    {
        [Required, MaxLength(120)]
        public string Name { get; set; } = null!;

        [Required, MaxLength(160)]
        public string Role { get; set; } = null!;

        [Required, MaxLength(2000)]
        public string Text { get; set; } = null!;

        [MaxLength(300)]
        public string? LinkedIn { get; set; }
    }
}
