using System.ComponentModel.DataAnnotations;

namespace Portfolio.BusinessLogic.DTOs.Analytics
{
    public class AnalyticsEventCreateDTO
    {
        [Required, MaxLength(300)]
        public string Path { get; set; } = null!;

        [MaxLength(500)]
        public string? Referrer { get; set; }
    }
}
