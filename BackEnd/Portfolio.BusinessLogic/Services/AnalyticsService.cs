using Portfolio.BusinessLogic.DTOs.Analytics;
using Portfolio.BusinessLogic.Services.Interfaces;
using Portfolio.DataAccess.Entities;
using Portfolio.DataAccess.Repositories;

namespace Portfolio.BusinessLogic.Services
{
    public class AnalyticsService(IAnalyticsEventRepository analyticsRepository) : IAnalyticsService
    {
        public async Task TrackAsync(AnalyticsEventCreateDTO dto, string? userAgent)
        {
            var entity = new AnalyticsEvent
            {
                Path = dto.Path.Trim(),
                Referrer = string.IsNullOrWhiteSpace(dto.Referrer) ? null : dto.Referrer.Trim(),
                UserAgent = string.IsNullOrWhiteSpace(userAgent) ? null : userAgent,
                CreatedAt = DateTime.UtcNow
            };
            await analyticsRepository.AddAsync(entity);
        }

        public async Task<AnalyticsSummaryDTO> GetSummaryAsync()
        {
            var all = await analyticsRepository.GetAllAsync();
            var now = DateTime.UtcNow;

            return new AnalyticsSummaryDTO
            {
                TotalAllTime = all.Count,
                TotalLast30Days = all.Count(a => a.CreatedAt >= now.AddDays(-30)),
                TotalLast7Days = all.Count(a => a.CreatedAt >= now.AddDays(-7)),
                TopPaths = all
                    .GroupBy(a => a.Path)
                    .Select(g => new PathCountDTO { Path = g.Key, Count = g.Count() })
                    .OrderByDescending(p => p.Count)
                    .Take(10)
                    .ToList()
            };
        }
    }
}
