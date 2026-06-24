using Portfolio.BusinessLogic.DTOs.Recommendation;
using Portfolio.DataAccess.Entities;

namespace Portfolio.BusinessLogic.Mappers
{
    public static class RecommendationMapper
    {
        public static RecommendationGetDTO ToGetDTO(Recommendation entity)
        {
            return new RecommendationGetDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Role = entity.Role,
                Text = entity.Text,
                LinkedIn = entity.LinkedIn,
                CreatedAt = entity.CreatedAt,
                Flagged = entity.Flagged
            };
        }

        public static Recommendation ToEntity(RecommendationCreateDTO dto)
        {
            return new Recommendation
            {
                Name = dto.Name.Trim(),
                Role = dto.Role.Trim(),
                Text = dto.Text.Trim(),
                LinkedIn = string.IsNullOrWhiteSpace(dto.LinkedIn) ? null : dto.LinkedIn.Trim(),
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
