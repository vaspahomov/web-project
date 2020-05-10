using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using backend.Models;
using backend.Services;

namespace backend.Data
{
    public interface IPictureRepository
    {
        Task<Picture?> Get(string id);
        Task<string> Save(Picture picture);
    }
}