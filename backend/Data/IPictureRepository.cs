using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using backend.Services;

namespace backend.Data
{
    /// <summary>
    /// Версионность поддерживаем, нет апдейта, только сейвы.
    /// </summary>
    public interface IPictureRepository
    {
        Task<Picture?> Get(Guid id);
        Task<Guid> Save(Picture picture);
    }
}