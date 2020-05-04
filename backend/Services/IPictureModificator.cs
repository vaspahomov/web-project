using System.IO;
using System.Threading.Tasks;
using ImageProcessor.Imaging;

namespace backend.Services
{
    public interface IPictureModificator
    {
        Image Crop(Image image, CropRectange cropRectangle);
        Image Rotate(Image image, float degrees);
        Image AddText(Image image, string text);
        Image AddBlackAndWhiteFilter(Image image);
        Image AddSepiaFilter(Image image);
        Image AddGaussianBlur(Image image, int size);
        Image AddCircularBlur(Image image);
        Image ToJPEG(Image image);
        Image ToPNG(Image image);
    }
}