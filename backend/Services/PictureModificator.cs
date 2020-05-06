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
        public Picture Crop(Picture picture, CropRectange cropRectangle) =>
            MapWithImageFactory(picture, img => img.Crop(cropRectangle.ToCropLayer));

        public Picture Rotate(Picture picture, float degrees) => MapWithImageFactory(picture, img => img.Rotate(degrees));

        public Picture AddText(Picture picture, string text) =>
            MapWithImageFactory(picture, img => img.Watermark(new TextLayer {Text = text}));

        public Picture AddBlackAndWhiteFilter(Picture picture) =>
            MapWithImageFactory(picture, img => img.Filter(MatrixFilters.BlackWhite));

        public Picture AddSepiaFilter(Picture picture) => MapWithImageFactory(picture, img => img.Filter(MatrixFilters.Sepia));

        public Picture AddGaussianBlur(Picture picture, int size) =>
            MapWithImageFactory(picture, img => img.GaussianBlur(size));

        public Picture AddCircularBlur(Picture picture) => MapWithImageFactory(picture, img => img.Saturation(50));

        public Picture ToJPEG(Picture picture) =>
            MapWithImageFactory(picture, img => img.Format(new JpegFormat {Quality = 70}));

        public Picture ToPNG(Picture picture) => MapWithImageFactory(picture, img => img.Format(new PngFormat {Quality = 70}));

        [Pure]
        private static Picture MapWithImageFactory(Picture picture, Func<ImageFactory, ImageFactory> f)
        {
            return picture.StreamMap((inStream, outStream) =>
            {
                using var imageFactory = new ImageFactory(preserveExifData: true);
                f(imageFactory.Load(inStream)).Save(outStream);
            });
        }
    }
}