using Microsoft.EntityFrameworkCore;
using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Repositories
{
    public class ContactMessageRepository(PortfolioDbContext context)
        : BaseRepository<ContactMessage>(context), IContactMessageRepository
    {
        public async Task<List<ContactMessage>> GetLatestAsync()
        {
            return await GetAllAsQueryable()
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }
    }
}
