using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Services;

namespace backend.Data
{
    public class InMemoryPictureRepository : IPictureRepository
    {
        private readonly Dictionary<Guid, Picture> storage;

        public InMemoryPictureRepository()
        {
            this.storage = new Dictionary<Guid, Picture>();
        }
        public Task<Picture?> Get(Guid id)
        {
            return Task.Run(() => storage.GetValueOrDefault(id));
        }

        public Task<Guid> Save(Picture picture)
        {
            var id = Guid.NewGuid();
            return Task.Run(() => storage[id] = picture).ContinueWith(_ => id);

        }
    }
}