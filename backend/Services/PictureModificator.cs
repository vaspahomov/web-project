using System;
using System.IO;
using ImageProcessor;
using ImageProcessor.Imaging;
using ImageProcessor.Imaging.Filters.Photo;
using ImageProcessor.Imaging.Formats;

namespace backend.Services
{
    public class PictureModificator : IPictureModificator
    {
        public MemoryStream Crop(MemoryStream inputStream, CropRectange cropRectange)
        {
            var cropLayer = new CropLayer(left: cropRectange.Left,
                top: cropRectange.Top,
                right: cropRectange.Right,
                bottom: cropRectange.Bottom);
            
            using (inputStream)
            using (var outputStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .Crop(cropLayer)
                    .Save(outputStream);
                return outputStream;
            }
        }

        public MemoryStream Rotate(MemoryStream inputStream, float degrees)
        {
            using (inputStream)
            using (var outputStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .Rotate(degrees)
                    .Save(outputStream);
                return outputStream;
            }
        }

        public MemoryStream AddText(MemoryStream inputStream, string text)
        {
            var textLayer = new TextLayer {Text = text};
            using (inputStream)
            using (var outputStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .Watermark(textLayer)
                    .Save(outputStream);
                return outputStream;
            }
        }

        public MemoryStream AddBlackAndWhiteFilter(MemoryStream inputStream)
        {
            using (inputStream)
            using (var outputStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .Filter(MatrixFilters.BlackWhite)
                    .Save(outputStream);
                return outputStream;
            }
        }

        public MemoryStream AddSepiaFilter(MemoryStream inputStream)
        {
            using (inputStream)
            using (var outputStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .Filter(MatrixFilters.Sepia)
                    .Save(outputStream);
                return outputStream;
            }
        }

        public MemoryStream AddGaussianBlur(MemoryStream inputStream, int size)
        {
            using (inputStream)
            using (var outputStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .GaussianBlur(size)
                    .Save(outputStream);
                return outputStream;
            }
        }

        public MemoryStream AddCircularBlur(MemoryStream inputStream)
        {
            //TODO: Implement
            throw new NotImplementedException();
        }

        public MemoryStream ToJPEG(MemoryStream inputStream)
        {
            using (var inStream = inputStream)
            using (var outStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inStream)
                    .Format(new JpegFormat {Quality = 70})
                    .Save(outStream);
                return outStream;
            }
        }

        public MemoryStream ToPNG(MemoryStream inputStream)
        {
            using (inputStream)
            using (var outStream = new MemoryStream())
            using (var imageFactory = new ImageFactory(preserveExifData: true))
            {
                imageFactory.Load(inputStream)
                    .Format(new PngFormat {Quality = 70})
                    .Save(outStream);
                return outStream;
            }
        }
    }
}