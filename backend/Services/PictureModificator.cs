using System;
using System.Diagnostics.Contracts;
using System.IO;
using ImageProcessor;
using ImageProcessor.Imaging;
using ImageProcessor.Imaging.Filters.Photo;
using ImageProcessor.Imaging.Formats;

namespace backend.Services
{
    public class PictureModificator : IPictureModificator
    {
        public Image Crop(Image image, CropRectange cropRectangle) =>
            MapWithImageFactory(image, img => img.Crop(cropRectangle.ToCropLayer));

        public Image Rotate(Image image, float degrees) => MapWithImageFactory(image, img => img.Rotate(degrees));

        public Image AddText(Image image, string text) =>
            MapWithImageFactory(image, img => img.Watermark(new TextLayer {Text = text}));

        public Image AddBlackAndWhiteFilter(Image image) =>
            MapWithImageFactory(image, img => img.Filter(MatrixFilters.BlackWhite));

        public Image AddSepiaFilter(Image image) => MapWithImageFactory(image, img => img.Filter(MatrixFilters.Sepia));

        public Image AddGaussianBlur(Image image, int size) =>
            MapWithImageFactory(image, img => img.GaussianBlur(size));

        public Image AddCircularBlur(Image image) => MapWithImageFactory(image, img => img.Saturation(50));

        public Image ToJPEG(Image image) =>
            MapWithImageFactory(image, img => img.Format(new JpegFormat {Quality = 70}));

        public Image ToPNG(Image image) => MapWithImageFactory(image, img => img.Format(new PngFormat {Quality = 70}));

        [Pure]
        private static Image MapWithImageFactory(Image image, Func<ImageFactory, ImageFactory> f)
        {
            return image.StreamMap((inStream, outStream) =>
            {
                using var imageFactory = new ImageFactory(preserveExifData: true);
                f(imageFactory.Load(inStream)).Save(outStream);
            });
        }
    }
}