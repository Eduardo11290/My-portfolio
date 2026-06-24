using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Security;
using Portfolio.BusinessLogic.DTOs.Recommendation;
using Portfolio.BusinessLogic.Services.Interfaces;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController(IRecommendationService recommendationService) : ControllerBase
    {
        /// <summary>Public — list all recommendations, newest first.</summary>
        [HttpGet]
        public async Task<ActionResult<List<RecommendationGetDTO>>> GetAll()
        {
            try
            {
                var items = await recommendationService.GetAllAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Public — submit a recommendation (shown immediately).</summary>
        [HttpPost]
        public async Task<ActionResult<RecommendationGetDTO>> Submit(RecommendationCreateDTO dto)
        {
            try
            {
                var created = await recommendationService.AddAsync(dto);
                return Ok(created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Admin — delete a recommendation.</summary>
        [HttpDelete("{id}")]
        [ApiKey]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await recommendationService.DeleteAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
