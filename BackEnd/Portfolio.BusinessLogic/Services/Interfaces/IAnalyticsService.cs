using Portfolio.BusinessLogic.DTOs.Analytics;

namespace Portfolio.BusinessLogic.Services.Interfaces
{
    public interface IAnalyticsService
    {
        Task TrackAsync(AnalyticsEventCreateDTO dto, string? userAgent);
        Task<AnalyticsSummaryDTO> GetSummaryAsync();
    }
}
