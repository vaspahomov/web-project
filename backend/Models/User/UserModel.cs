using System;

namespace backend.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string Username { get; set; }

        public UserModel(string username)
        {
            Username = username;
        }
    }
}