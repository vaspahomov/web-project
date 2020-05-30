using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Data.Repositories;
using backend.Helpers;
using backend.Models;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserEntity?> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var userEntity = await _userRepository.FindByUsernameAsync(username);

            if (userEntity == null)
                return null;

            return IsVerifiedPassword(password, userEntity.PasswordHash, userEntity.PasswordSalt) ? userEntity : null;
        }

        public async Task<UserEntity> Create(string username, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            var found = await _userRepository.FindByUsernameAsync(username);

            if (found != null)
                throw new AppException($"Username \"{username}\" is already taken");

            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            var userEntity = new UserEntity(Guid.NewGuid(), username, passwordHash, passwordSalt);

            await _userRepository.InsertAsync(userEntity);
            return userEntity;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private static bool IsVerifiedPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null)
                throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Length != 64)
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            if (storedSalt.Length != 128)
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).",
                    nameof(storedSalt));

            using var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return !computedHash.Where((t, i) => t != storedHash[i]).Any();
        }
    }

    public interface IUserService
    {
        Task<UserEntity?> Authenticate(string username, string password);
        Task<UserEntity> Create(string username, string password);
    }
}