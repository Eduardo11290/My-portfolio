using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Security;
using Portfolio.BusinessLogic.DTOs.Analytics;
using Portfolio.BusinessLogic.Services.Interfaces;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController(IAnalyticsService analyticsService) : ControllerBase
    {
        /// <summary>Public — record a page/section view.</summary>
        [HttpPost]
        public async Task<ActionResult> Track(AnalyticsEventCreateDTO dto)
        {
            try
            {
                var userAgent = Request.Headers.UserAgent.ToString();
                await analyticsService.TrackAsync(dto, userAgent);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Admin — aggregate visitor stats.</summary>
        [HttpGet("summary")]
        [ApiKey]
        public async Task<ActionResult<AnalyticsSummaryDTO>> GetSummary()
        {
            try
            {
                var summary = await analyticsService.GetSummaryAsync();
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
