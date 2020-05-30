using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Drawing;
using System.IO;
using ImageProcessor;
using SixLabors.Fonts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.Processing;
using Color = SixLabors.ImageSharp.Color;
using FontStyle = SixLabors.Fonts.FontStyle;
using Image = SixLabors.ImageSharp.Image;
using PointF = SixLabors.ImageSharp.PointF;
using Size = SixLabors.ImageSharp.Size;

namespace backend.Services
{
    internal class ImageSharpPictureModificator : IPictureModificator
    {
        public Picture Crop(Picture picture, CropRectangle cropRectangle)
            => MapWithImageContext(picture, x => x.Crop(cropRectangle.ToRectangle));

        public Picture Rotate(Picture picture, float degrees)
            => MapWithImageContext(picture, x => x.Rotate(degrees));

        public Picture AddText(Picture picture, string text)
        {
            var collection = new FontCollection();
            var family = collection.Install("fonts/OpenSans-Regular.ttf");
            var font = family.CreateFont(12, FontStyle.Regular);

            return MapWithImageContext(picture, (x, size) =>
            {
                var center = new PointF(x: size.Width / 2f, y: size.Height / 2f);
                return x.DrawText(text, font, Color.Azure, center);
            });
        }


        public Picture AddBlackAndWhiteFilter(Picture picture)
            => MapWithImageContext(picture, x => x.BlackWhite());

        public Picture AddSepiaFilter(Picture picture)
            => MapWithImageContext(picture, x => x.Sepia());

        public Picture AddGaussianBlur(Picture picture, int size)
            => MapWithImageContext(picture, x => x.GaussianBlur(size));

        public Picture AddCircularBlur(Picture picture)
            => MapWithImageContext(picture, x => x.BoxBlur());

        [Pure]
        private static Picture MapWithImageContext(Picture picture,
            Func<IImageProcessingContext, IImageProcessingContext> f)
            => MapWithImageContext(picture, (ctx, _) => f(ctx));

        [Pure]
        private static Picture MapWithImageContext(Picture picture,
            Func<IImageProcessingContext, Size, IImageProcessingContext> f)
        {
            using var outputStream = new MemoryStream();
            using Image image = Image.Load(picture.AsBytes);
            image.Mutate(x => f(x, image.Size()));
            image.SaveAsJpeg(outputStream);
            return new Picture(outputStream.ToArray(), picture.Filename, picture.Id);
        }
    }
}