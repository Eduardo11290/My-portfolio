using Portfolio.BusinessLogic.DTOs.Contact;
using Portfolio.DataAccess.Entities;

namespace Portfolio.BusinessLogic.Mappers
{
    public static class ContactMapper
    {
        public static ContactGetDTO ToGetDTO(ContactMessage entity)
        {
            return new ContactGetDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Message = entity.Message,
                CreatedAt = entity.CreatedAt,
                IsRead = entity.IsRead
            };
        }

        public static ContactMessage ToEntity(ContactCreateDTO dto)
        {
            return new ContactMessage
            {
                Name = dto.Name.Trim(),
                Email = dto.Email.Trim(),
                Message = dto.Message.Trim(),
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
