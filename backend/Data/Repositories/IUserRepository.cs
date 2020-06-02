using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Services;
using MongoDB.Bson;

namespace backend.Data.Repositories
{
    public interface IUserRepository
    {
        Task<Guid> InsertAsync(UserEntity user);
        Task<Guid> UpdateAsync(UserEntity user);
        //TODO: Why we need this? Looks useless
        Task<UserEntity[]> GetAllUsers();
        Task<bool> AddPictureAsync(Guid userId, Picture picture, DateTime time);
        Task<List<ObjectId>> GetUserPictures(Guid userId);
        Task<UserEntity> FindByIdAsync(Guid userId);
        Task<UserEntity> FindByUsernameAsync(string username);
    }
}