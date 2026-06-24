using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Repositories
{
    public interface IAnalyticsEventRepository : IRepository<AnalyticsEvent>
    {
        Task<int> CountSinceAsync(DateTime since);
        Task<List<AnalyticsEvent>> GetSinceAsync(DateTime since);
    }
}
