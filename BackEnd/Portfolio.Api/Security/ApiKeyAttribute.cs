using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Portfolio.Api.Security
{
    /// <summary>
    /// Gates an endpoint behind a shared admin key sent in the `X-Api-Key`
    /// header and compared against `Admin:ApiKey` in configuration.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class ApiKeyAttribute : Attribute, IAuthorizationFilter
    {
        private const string HeaderName = "X-Api-Key";

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var expected = config["Admin:ApiKey"];

            if (string.IsNullOrWhiteSpace(expected))
            {
                context.Result = new ObjectResult("Admin API key is not configured.")
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
                return;
            }

            if (!context.HttpContext.Request.Headers.TryGetValue(HeaderName, out var provided)
                || provided != expected)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
