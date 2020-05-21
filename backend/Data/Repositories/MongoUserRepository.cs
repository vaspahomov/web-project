using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Data.Repositories;
using backend.Models;
using MongoDB.Driver;

namespace backend.Data
{
    public class MongoUserRepository: IUserRepository
    {
        public IMongoCollection<UserEntity> userCollection;
        public MongoUserRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            userCollection = database.GetCollection<UserEntity>(settings.CollectionName);
        }

        public async Task<Guid> InsertAsync(UserEntity user)
        {
            await userCollection.InsertOneAsync(user);
            return user.Id;
        }

        public async Task<Guid> UpdateAsync(UserEntity user)
        {
            await userCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            return user.Id;
        }

        public Task<UserEntity[]> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddPictureAsync(Guid userId, PictureEntity picture, DateTime time)
        {
            var user = await FindByIdAsync(userId);
            var userPics = user.Pictures;
            userPics.Add(picture);
            var newUser = new UserEntity(user.Id, user.Username, user.PasswordHash, user.PasswordSalt, userPics);
            await UpdateAsync(newUser);
            return true;
        }

        public Task<UserEntity> FindByIdAsync(Guid userId)
        {
            return userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }
        
        public Task<UserEntity> FindByUsernameAsync(string username)
        {
            return userCollection.Find(u => u.Username == username).FirstOrDefaultAsync();
        }

        public async Task<List<PictureEntity>> GetUserPictures(Guid userId)
        {
            var user = await FindByIdAsync(userId);
            return user.Pictures;
        }
    }
}