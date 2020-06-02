using System;
using System.Collections.Generic;
using System.Linq;
using backend.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Data.Entities
{
    public class UserEntity
    {
        public Guid Id { get; private set; }
        [BsonElement] public readonly string Username;
        [BsonElement] public readonly byte[] PasswordHash;
        [BsonElement] public readonly byte[] PasswordSalt;
        [BsonElement] public readonly List<Picture> Pictures;

        [BsonConstructor]
        public UserEntity(Guid id, string username, byte[] passwordHash, byte[] passwordSalt, List<Picture> pictures)
        {
            Id = id;
            Username = username;
            PasswordHash = passwordHash;
            PasswordSalt = passwordSalt;
            Pictures = pictures;
        }
        
        public UserEntity(Guid id, string username, byte[] passwordHash, byte[] passwordSalt)
        {
            Id = id;
            Username = username;
            PasswordHash = passwordHash;
            PasswordSalt = passwordSalt;
            Pictures = new List<Picture>();
        }     
    }
}