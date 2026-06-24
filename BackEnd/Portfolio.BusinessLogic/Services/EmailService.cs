using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using Portfolio.BusinessLogic.Services.Interfaces;
using Portfolio.DataAccess.Entities;

namespace Portfolio.BusinessLogic.Services
{
    /// <summary>
    /// Sends transactional email through the Resend HTTP API. If no API key is
    /// configured the call is a safe no-op, so saving a contact message never
    /// fails just because email isn't set up yet.
    /// </summary>
    public class EmailService(
        HttpClient httpClient,
        EmailSettings settings,
        ILogger<EmailService> logger) : IEmailService
    {
        public async Task SendContactNotificationAsync(ContactMessage message)
        {
            if (string.IsNullOrWhiteSpace(settings.ApiKey))
            {
                logger.LogInformation(
                    "Resend API key not configured — skipping email for contact #{Id}.", message.Id);
                return;
            }

            var payload = new
            {
                from = settings.From,
                to = new[] { settings.To },
                reply_to = message.Email,
                subject = $"New portfolio message from {message.Name}",
                html =
                    "<h2>New contact message</h2>" +
                    $"<p><strong>Name:</strong> {System.Net.WebUtility.HtmlEncode(message.Name)}</p>" +
                    $"<p><strong>Email:</strong> {System.Net.WebUtility.HtmlEncode(message.Email)}</p>" +
                    "<p><strong>Message:</strong></p>" +
                    $"<p style=\"white-space:pre-wrap\">{System.Net.WebUtility.HtmlEncode(message.Message)}</p>"
            };

            try
            {
                using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails")
                {
                    Content = JsonContent.Create(payload)
                };
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", settings.ApiKey);

                var response = await httpClient.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadAsStringAsync();
                    logger.LogWarning("Resend returned {Status}: {Body}", response.StatusCode, body);
                }
            }
            catch (Exception ex)
            {
                // Best-effort — never let an email failure break the contact form.
                logger.LogError(ex, "Failed to send contact notification email.");
            }
        }
    }
}
