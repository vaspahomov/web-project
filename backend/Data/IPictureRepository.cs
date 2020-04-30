using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Data
{
    public interface IRepositoryPictures
    {
        Task<bool> IsPictureExistAsync(Guid id);
        Task<PictureEntity> GetPictureAsync(Guid id);
        Task<bool> IsPictureOwnerAsync(Guid id, string ownerId);
        Task AddPictureAsync(PictureEntity photo);
        Task UpdatePictureAsync(PictureEntity photo);
        Task DeletePictureAsync(PictureEntity photo);
        Task<bool> SaveAsync();
    }
}