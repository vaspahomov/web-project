using System;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Services;
using MongoDB.Bson;

namespace backend.Data.Repositories
{
    public interface IPictureRepository
    {
        Task<Picture?> Get(ObjectId picture);
        Task<Picture> Save(byte[] data, string filename);
        Task<bool> TryUpdate(Picture newPicture, ObjectId id);

        Task<bool> TryRollback(ObjectId pictureId);
    }
}