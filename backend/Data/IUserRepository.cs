using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public interface IUserRepository
    {
        Task<Guid> AddUser();

        Task<bool> AddImageForUser(Guid userId, Guid imageId, DateTime time);

        Task<IEnumerable<Guid>> GetImageIdsForUser(Guid userId, DateTime after);

        public Task<IEnumerable<Guid>> GetImageIdsForUser(Guid userId)
            => GetImageIdsForUser(userId, DateTime.MinValue);
    }

    public class InMemoryUserRepository : IUserRepository
    {
        private readonly Dictionary<Guid, List<(Guid, DateTime)>> storage;

        public InMemoryUserRepository()
        {
            storage = new Dictionary<Guid, List<(Guid, DateTime)>>();
        }

        public async Task<Guid> AddUser()
        {
            var userId = Guid.NewGuid();
            storage[userId] = new List<(Guid, DateTime)>();
            return userId;
        }

        public async Task<bool> AddImageForUser(Guid userId, Guid imageId, DateTime time)
        {
            if (!storage.TryGetValue(userId, out var list)) return false;
            storage[userId] = list.Append((imageId, time)).ToList();
            return true;

        }

        public async Task<IEnumerable<Guid>> GetImageIdsForUser(Guid userId, DateTime after)
        {
            if (!storage.TryGetValue(userId, out var list)) return Enumerable.Empty<Guid>();
            return list.Where(t => t switch
            {
                 var (_, time) => time > after
            }).Select(t => t.Item1);
        }
    }
}