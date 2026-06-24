namespace Portfolio.DataAccess.Entities
{
    public class Recommendation
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string Text { get; set; } = null!;
        public string? LinkedIn { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// True when the submission tripped the profanity filter. It still shows
        /// publicly — this just flags it so the admin can spot and delete it.
        /// </summary>
        public bool Flagged { get; set; }
    }
}
