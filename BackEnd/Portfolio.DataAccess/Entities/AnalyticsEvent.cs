namespace Portfolio.DataAccess.Entities
{
    public class AnalyticsEvent
    {
        public int Id { get; set; }
        /// <summary>The page or section path that was viewed, e.g. "/" or "#work".</summary>
        public string Path { get; set; } = null!;
        public string? Referrer { get; set; }
        public string? UserAgent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
