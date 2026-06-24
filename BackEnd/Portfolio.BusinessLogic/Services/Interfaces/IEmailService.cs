using Portfolio.DataAccess.Entities;

namespace Portfolio.BusinessLogic.Services.Interfaces
{
    public interface IEmailService
    {
        /// <summary>Best-effort: notifies the site owner about a new contact message.</summary>
        Task SendContactNotificationAsync(ContactMessage message);
    }
}
