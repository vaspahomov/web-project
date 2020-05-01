using System;
using System.IO;
using System.Threading.Tasks;
using ImageProcessor.Imaging;

namespace backend.Services
{
    public class CropRectange
    {
        public CropRectange(float left, float top, float right, float bottom)
        {
            if ((double) left < 0.0)
                throw new ArgumentOutOfRangeException(nameof(left));
            if ((double) top < 0.0)
                throw new ArgumentOutOfRangeException(nameof(top));
            if ((double) right < 0.0)
                throw new ArgumentOutOfRangeException(nameof(right));
            if ((double) bottom < 0.0)
                throw new ArgumentOutOfRangeException(nameof(bottom));
            this.Left = left;
            this.Top = top;
            this.Right = right;
            this.Bottom = bottom;
        }

        public float Left { get; set; }
        public float Top { get; set; }
        public float Right { get; set; }
        public float Bottom { get; set; }
    }

    public interface IPictureModificator
    {
        MemoryStream Crop(MemoryStream pictureStream, CropRectange cropRectange);
        MemoryStream Rotate(MemoryStream pictureStream, float degrees);
        MemoryStream AddText(MemoryStream pictureStream, string text);
        MemoryStream AddBlackAndWhiteFilter(MemoryStream pictureStream);
        MemoryStream AddSepiaFilter(MemoryStream pictureStream);
        MemoryStream AddGaussianBlur(MemoryStream pictureStream, int size);
        MemoryStream AddCircularBlur(MemoryStream pictureStream);
        MemoryStream ToJPEG(MemoryStream pictureStream);
        MemoryStream ToPNG(MemoryStream pictureStream);
    }
}