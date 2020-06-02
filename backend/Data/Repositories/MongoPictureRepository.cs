using System;
using System.IO;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Data.Repositories;
using backend.Models;
using backend.Services;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace backend.Data
{
    public class MongoPictureRepository : IPictureRepository
    {
        private readonly ILogger<MongoPictureRepository> _logger;
        private readonly IMongoCollection<PictureDto> _pictures;
        private readonly GridFSBucket _gridFs;

        public MongoPictureRepository(IMongoDatabase database, DatabaseSettings settings, ILogger<MongoPictureRepository> logger)
        {
            _logger = logger;
            _gridFs = new GridFSBucket(database);
            _pictures = database.GetCollection<PictureDto>(settings.PictureCollectionName);
            _pictures.Indexes.CreateOne(
                new CreateIndexModel<PictureDto>(Builders<PictureDto>.IndexKeys.Ascending("expireAt"),
                    new CreateIndexOptions
                        {ExpireAfter = new TimeSpan(30 * 24, 0, 0)}));
        }

        public async Task<Picture?> Get(PictureEntity picture)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(f => f.Id, new ObjectId(picture.Id));
            var fileInfos = await _gridFs.FindAsync(filter);
            var fileInfo = fileInfos.FirstOrDefault();
            if (fileInfo == null)
                return null;
            var pic = await _gridFs.DownloadAsBytesAsync(picture.Id);
            _logger.LogInformation($"Got picture data for {picture.Id} with length {pic.Length}");
            return new Picture(pic, fileInfo.Filename);
        }

        public async Task<PictureEntity> Save(Picture picture)
        {
            var imageId = await _gridFs.UploadFromBytesAsync(picture.Filename, picture.AsBytes);
            _logger.LogInformation($"Saved picture {picture.Filename} for {imageId}");

            var pictureEntity = new PictureEntity(imageId.ToString());
            return pictureEntity;
        }
    }
}