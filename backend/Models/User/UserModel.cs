using System;

namespace backend.Models
{
    public class UserModel
    {
        public Guid Id { get; }
        public string Username { get; }
        public Guid? LastPictureId { get; }
        public UserModel(string username, Guid? lastPictureId, Guid id)
        {
            Username = username;
            LastPictureId = lastPictureId;
            Id = id;
        }
    }
}