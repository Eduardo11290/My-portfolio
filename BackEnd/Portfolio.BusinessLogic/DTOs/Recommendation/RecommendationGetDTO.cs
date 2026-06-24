namespace Portfolio.BusinessLogic.DTOs.Recommendation
{
    public class RecommendationGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string Text { get; set; } = null!;
        public string? LinkedIn { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Flagged { get; set; }
    }
}
