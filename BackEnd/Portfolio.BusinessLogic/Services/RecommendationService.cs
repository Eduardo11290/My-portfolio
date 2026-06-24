using Portfolio.BusinessLogic.DTOs.Recommendation;
using Portfolio.BusinessLogic.Mappers;
using Portfolio.BusinessLogic.Services.Interfaces;
using Portfolio.DataAccess.Repositories;

namespace Portfolio.BusinessLogic.Services
{
    public class RecommendationService(IRecommendationRepository recommendationRepository)
        : IRecommendationService
    {
        public async Task<RecommendationGetDTO> AddAsync(RecommendationCreateDTO dto)
        {
            var entity = RecommendationMapper.ToEntity(dto);
            entity.Flagged = ProfanityFilter.ContainsProfanity(
                entity.Name, entity.Role, entity.Text);

            var created = await recommendationRepository.AddAsync(entity);
            return RecommendationMapper.ToGetDTO(created);
        }

        public async Task<List<RecommendationGetDTO>> GetAllAsync()
        {
            var items = await recommendationRepository.GetAllOrderedAsync();
            return items.Select(RecommendationMapper.ToGetDTO).ToList();
        }

        public async Task DeleteAsync(int id)
        {
            await recommendationRepository.DeleteAsync(id);
        }
    }
}
