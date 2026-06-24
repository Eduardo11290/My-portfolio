using Portfolio.BusinessLogic.DTOs.Contact;

namespace Portfolio.BusinessLogic.Services.Interfaces
{
    public interface IContactService
    {
        Task<ContactGetDTO> AddAsync(ContactCreateDTO dto);
        Task<List<ContactGetDTO>> GetAllAsync();
    }
}
