using Portfolio.BusinessLogic.DTOs.Contact;
using Portfolio.BusinessLogic.Mappers;
using Portfolio.BusinessLogic.Services.Interfaces;
using Portfolio.DataAccess.Repositories;

namespace Portfolio.BusinessLogic.Services
{
    public class ContactService(
        IContactMessageRepository contactRepository,
        IEmailService emailService) : IContactService
    {
        public async Task<ContactGetDTO> AddAsync(ContactCreateDTO dto)
        {
            var entity = ContactMapper.ToEntity(dto);
            var created = await contactRepository.AddAsync(entity);

            // Best-effort notification; failures are swallowed inside the service.
            await emailService.SendContactNotificationAsync(created);

            return ContactMapper.ToGetDTO(created);
        }

        public async Task<List<ContactGetDTO>> GetAllAsync()
        {
            var messages = await contactRepository.GetLatestAsync();
            return messages.Select(ContactMapper.ToGetDTO).ToList();
        }
    }
}
