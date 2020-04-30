using System.Threading.Tasks;

namespace backend.Services
{
    public interface IPictureModificator
    {
        Task Crop();
        Task Rotate();
        Task AddText();
        Task AddBlackAndWhiteFilter();
        Task AddSepiaFilter();
        Task AddGaussianBlur();
        Task AddCircularBlur();
        Task ToJPEG();
        Task ToPNG();
    }
}