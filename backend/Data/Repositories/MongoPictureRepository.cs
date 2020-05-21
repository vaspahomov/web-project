using System;
using System.IO;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Data.Repositories;
using backend.Models;
using backend.Services;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace backend.Data
{
    public class MongoPictureRepository : IPictureRepository
    {
        private readonly IMongoCollection<PictureDto> pictures;
        private readonly GridFSBucket gridFs;

        public MongoPictureRepository(IPictureDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            gridFs = new GridFSBucket(database);
            pictures = database.GetCollection<PictureDto>(settings.CollectionName);
        }

        public async Task<Picture?> Get(PictureEntity picture)
        {
            var ms = new MemoryStream();
            var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", picture.Id);
            var fileInfos = await gridFs.FindAsync(filter);
            var fileInfo = fileInfos.FirstOrDefault();
            Console.WriteLine($"info -> {fileInfo.Id}");
            if (fileInfo == null)
                return null;
            var pic = await gridFs.DownloadAsBytesAsync(picture.Id);
            Console.WriteLine(pic.Length);
            return new Picture(pic, fileInfo.Filename);
        }

        public async Task<PictureEntity> Save(Picture picture)
        {
            var imageId = await gridFs.UploadFromBytesAsync(picture.Filename, picture.AsBytes);
            Console.WriteLine(picture.AsBytes.Length);
            var pictureEntity = new PictureEntity(imageId);
            return pictureEntity;
        }
    }


}