using Microsoft.EntityFrameworkCore;
using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Repositories
{
    public class RecommendationRepository(PortfolioDbContext context)
        : BaseRepository<Recommendation>(context), IRecommendationRepository
    {
        public async Task<List<Recommendation>> GetAllOrderedAsync()
        {
            return await GetAllAsQueryable()
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
    }
}
