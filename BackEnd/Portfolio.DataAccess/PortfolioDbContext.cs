using Microsoft.EntityFrameworkCore;
using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess
{
    public class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
    {
        public DbSet<ContactMessage> ContactMessages { get; set; } = null!;
        public DbSet<Recommendation> Recommendations { get; set; } = null!;
        public DbSet<AnalyticsEvent> AnalyticsEvents { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PortfolioDbContext).Assembly);
        }
    }
}
