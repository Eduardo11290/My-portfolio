using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Repositories
{
    public interface IRecommendationRepository : IRepository<Recommendation>
    {
        Task<List<Recommendation>> GetAllOrderedAsync();
    }
}
