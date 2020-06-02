using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Models;
using backend.Services;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Data.Repositories
{
    public class MongoUserRepository: IUserRepository
    {
        private readonly ILogger<MongoUserRepository> _logger;
        private readonly IMongoCollection<UserEntity> _userCollection;
        public MongoUserRepository(IMongoDatabase database, DatabaseSettings settings, ILogger<MongoUserRepository> logger)
        {
            _logger = logger;
            _userCollection = database.GetCollection<UserEntity>(settings.UserCollectionName);
        }

        public async Task<Guid> InsertAsync(UserEntity user)
        {
            await _userCollection.InsertOneAsync(user);
            return user.Id;
        }

        public async Task<Guid> UpdateAsync(UserEntity user)
        {
            await _userCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            return user.Id;
        }

        public Task<UserEntity[]> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddPictureAsync(Guid userId, Picture picture, DateTime time)
        {
            var user = await FindByIdAsync(userId);
            if (user == null)
                return false;

            var userPics = user.Pictures;
            userPics.Add(picture.Id);
            var newUser = new UserEntity(user.Id, user.Username, user.PasswordHash, user.PasswordSalt, userPics);
            _logger.LogInformation($"Created new User {newUser}");
            await UpdateAsync(newUser);
            return true;
        }

        public Task<UserEntity> FindByIdAsync(Guid userId)
        {
            return _userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }
        
        public Task<UserEntity> FindByUsernameAsync(string username)
        {
            return _userCollection.Find(u => u.Username == username).FirstOrDefaultAsync();
        }

        public async Task<List<ObjectId>> GetUserPictures(Guid userId)
        {
            var user = await FindByIdAsync(userId);
            return user != null 
                ? user.Pictures 
                : new List<ObjectId>();
        }
    }
}