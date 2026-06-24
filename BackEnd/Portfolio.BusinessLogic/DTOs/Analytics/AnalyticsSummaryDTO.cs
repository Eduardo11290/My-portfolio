namespace Portfolio.BusinessLogic.DTOs.Analytics
{
    public class AnalyticsSummaryDTO
    {
        public int TotalAllTime { get; set; }
        public int TotalLast30Days { get; set; }
        public int TotalLast7Days { get; set; }
        public List<PathCountDTO> TopPaths { get; set; } = [];
    }

    public class PathCountDTO
    {
        public string Path { get; set; } = null!;
        public int Count { get; set; }
    }
}
