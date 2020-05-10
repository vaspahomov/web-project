using System;
using System.IO;
using System.Threading.Tasks;
using backend.Models;
using backend.Services;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace backend.Data
{
    public class MongoRepository : IPictureRepository
    {
        private readonly IMongoCollection<PictureDto> pictures;
        private readonly GridFSBucket gridFs;

        public MongoRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            gridFs = new GridFSBucket(database);
            pictures = database.GetCollection<PictureDto>(settings.CollectionName);
        }

        public async Task<Picture?> Get(string id)
        {
            var ms = new MemoryStream();
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Id, new ObjectId(id));
            var fileInfos = await gridFs.FindAsync(filter);
            var fileInfo = fileInfos.FirstOrDefault();
            if (fileInfo == null)
                return null;
            await gridFs.DownloadToStreamAsync(id, ms);
            return new Picture(ms, fileInfo.Filename);
        }

        public async Task<string> Save(Picture picture)
        {
            var imageId = await gridFs.UploadFromStreamAsync(picture.Filename, picture.AsStream);
            return imageId.ToString();
        }
    }
    
    
}