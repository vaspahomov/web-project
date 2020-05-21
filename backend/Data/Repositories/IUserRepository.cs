using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data.Entities;

namespace backend.Data.Repositories
{
    public interface IUserRepository
    {
        Task<Guid> InsertAsync(UserEntity user);
        Task<Guid> UpdateAsync(UserEntity user);
        //TODO: Why we need this? Looks useless
        Task<UserEntity[]> GetAllUsers();
        Task<bool> AddPictureAsync(Guid userId, PictureEntity imageId, DateTime time);
        Task<List<PictureEntity>> GetUserPictures(Guid userId);
        Task<UserEntity> FindByIdAsync(Guid userId);
        Task<UserEntity> FindByUsernameAsync(string username);
    }
}