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
        public Task<Picture?> Get(string id)
        {
            return Task.Run(() => storage.GetValueOrDefault(new Guid(id)));
        }

        public Task<string> Save(Picture picture)
        {
            var id = Guid.NewGuid();
            return Task.Run(() => storage[id] = picture).ContinueWith(_ => id.ToString());
        }
    }
}