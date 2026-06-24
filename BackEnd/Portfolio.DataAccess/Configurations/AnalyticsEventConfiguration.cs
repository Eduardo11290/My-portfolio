using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Configurations
{
    public class AnalyticsEventConfiguration : IEntityTypeConfiguration<AnalyticsEvent>
    {
        public void Configure(EntityTypeBuilder<AnalyticsEvent> builder)
        {
            builder.ToTable("AnalyticsEvents");
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Path).IsRequired().HasMaxLength(300);
            builder.Property(a => a.Referrer).HasMaxLength(500).IsRequired(false);
            builder.Property(a => a.UserAgent).HasMaxLength(500).IsRequired(false);
            builder.Property(a => a.CreatedAt).IsRequired();
            builder.HasIndex(a => a.CreatedAt);
        }
    }
}
