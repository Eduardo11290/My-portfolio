using Microsoft.EntityFrameworkCore;
using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Repositories
{
    public class AnalyticsEventRepository(PortfolioDbContext context)
        : BaseRepository<AnalyticsEvent>(context), IAnalyticsEventRepository
    {
        public async Task<int> CountSinceAsync(DateTime since)
        {
            return await GetAllAsQueryable()
                .Where(a => a.CreatedAt >= since)
                .CountAsync();
        }

        public async Task<List<AnalyticsEvent>> GetSinceAsync(DateTime since)
        {
            return await GetAllAsQueryable()
                .Where(a => a.CreatedAt >= since)
                .ToListAsync();
        }
    }
}
