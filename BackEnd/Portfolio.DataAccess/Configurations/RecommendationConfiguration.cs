using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.DataAccess.Entities;

namespace Portfolio.DataAccess.Configurations
{
    public class RecommendationConfiguration : IEntityTypeConfiguration<Recommendation>
    {
        public void Configure(EntityTypeBuilder<Recommendation> builder)
        {
            builder.ToTable("Recommendations");
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Name).IsRequired().HasMaxLength(120);
            builder.Property(r => r.Role).IsRequired().HasMaxLength(160);
            builder.Property(r => r.Text).IsRequired().HasMaxLength(2000);
            builder.Property(r => r.LinkedIn).HasMaxLength(300).IsRequired(false);
            builder.Property(r => r.CreatedAt).IsRequired();
            builder.HasIndex(r => r.CreatedAt);
        }
    }
}
