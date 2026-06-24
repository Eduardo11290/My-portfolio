using Portfolio.BusinessLogic.DTOs.Recommendation;

namespace Portfolio.BusinessLogic.Services.Interfaces
{
    public interface IRecommendationService
    {
        /// <summary>Public submission — shown immediately (flagged if profane).</summary>
        Task<RecommendationGetDTO> AddAsync(RecommendationCreateDTO dto);

        /// <summary>All recommendations, newest first (shown publicly).</summary>
        Task<List<RecommendationGetDTO>> GetAllAsync();

        /// <summary>Admin — delete a recommendation.</summary>
        Task DeleteAsync(int id);
    }
}
