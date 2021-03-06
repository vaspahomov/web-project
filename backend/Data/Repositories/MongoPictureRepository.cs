using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        private readonly IPictureModificator _modificator;
        private readonly IMongoCollection<PictureEntity> _pictures;
        private readonly GridFSBucket _gridFs;

        public MongoPictureRepository(IMongoDatabase database, DatabaseSettings settings,
            ILogger<MongoPictureRepository> logger, IPictureModificator modificator)
        {
            _logger = logger;
            _modificator = modificator;
            _gridFs = new GridFSBucket(database);
            _pictures = database.GetCollection<PictureEntity>(settings.PictureCollectionName);
            _pictures.Indexes.CreateOne(
                new CreateIndexModel<PictureEntity>(Builders<PictureEntity>.IndexKeys.Ascending("expireAt"),
                    new CreateIndexOptions
                        {ExpireAfter = new TimeSpan(30 * 24, 0, 0)}));
        }

        public async Task<Picture?> Get(ObjectId pictureId)
        {
            var pictures = await _pictures.FindAsync(p => p.Id == pictureId);
            var pictureEntities = pictures.Current.ToList();
            if (!pictureEntities.Any())
                return null;
            _logger.LogDebug($"Got pictures from mongo: {string.Concat(pictureEntities.Select(e => e.ToString()))}");
            var picture = pictures.First();
            var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", picture.GridFsIds.Last());
            var fileInfos = await _gridFs.FindAsync(filter);
            var fileInfo = fileInfos.FirstOrDefault();
            if (fileInfo == null)
                return null;
            var pic = await _gridFs.DownloadAsBytesAsync(picture.Id);
            _logger.LogInformation($"Got picture data for {pictureId} with length {pic.Length}");

            return new Picture(pic, picture.Filename, picture.Id, picture.Width, picture.Height);
        }

        public async Task<ObjectId> Save(byte[] data, string filename)
        {
            var (w, h ) = _modificator.GetSize(data);
            var gridFsImageId = await _gridFs.UploadFromBytesAsync(filename, data);
            _logger.LogInformation($"Saved picture {filename} for {gridFsImageId}");

            var pictureEntity = PictureEntity.WithNoId(filename, h, w, new List<ObjectId> {gridFsImageId});
            await _pictures.InsertOneAsync(pictureEntity);
            return pictureEntity.Id;
        }

        public async Task<bool> TryUpdate(Picture newPicture, ObjectId id)
        {
            var pictures = await _pictures.FindAsync(p => p.Id == id);
            var pictureEntities = pictures.Current.ToList();
            if (!pictureEntities.Any())
                return false;

            var picture = pictures.First();
            var imageId = await _gridFs.UploadFromBytesAsync(picture.Filename, newPicture.AsBytes);

            var pictureEntity = new PictureEntity(picture.Id, picture.Filename, picture.Height, picture.Width,
                picture.GridFsIds.Append(imageId).ToList());

            await _pictures.ReplaceOneAsync(new FilterDefinitionBuilder<PictureEntity>().Eq("_id", picture.Id),
                pictureEntity);
            return true;
        }

        public async Task<bool> TryRollback(ObjectId pictureId)
        {
            var pictures = await _pictures.FindAsync(p => p.Id == pictureId);
            var pictureEntities = pictures.Current.ToList();
            if (!pictureEntities.Any())
                return false;
            var picture = pictures.First();
            if (picture.GridFsIds.Count < 2)
                return false;

            var old = picture.GridFsIds.Last();
            picture.GridFsIds.RemoveAt(picture.GridFsIds.Count - 1);

            await _gridFs.DeleteAsync(old);
            await _pictures.ReplaceOneAsync(new FilterDefinitionBuilder<PictureEntity>().Eq("_id", picture.Id),
                picture);

            return true;
        }
    }
}