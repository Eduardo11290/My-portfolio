namespace Portfolio.BusinessLogic.Services
{
    /// <summary>Resend email configuration, bound from appsettings in the API layer.</summary>
    public class EmailSettings
    {
        public string? ApiKey { get; set; }
        public string From { get; set; } = "Portfolio <onboarding@resend.dev>";
        public string To { get; set; } = "edystefoni2005@gmail.com";
    }
}
