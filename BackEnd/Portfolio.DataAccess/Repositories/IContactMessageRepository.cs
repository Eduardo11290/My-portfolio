using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Repositories
{
    public interface IContactMessageRepository : IRepository<ContactMessage>
    {
        Task<List<ContactMessage>> GetLatestAsync();
    }
}
