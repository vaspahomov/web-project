using System;
using System.Threading.Tasks;
using backend.Data.Entities;
using backend.Services;

namespace backend.Data.Repositories
{
    public interface IPictureRepository
    {
        Task<Picture?> Get(PictureEntity picture);
        Task<PictureEntity> Save(Picture picture);
    }
}