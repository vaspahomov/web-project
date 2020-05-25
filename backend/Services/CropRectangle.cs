using System;
using ImageProcessor.Imaging;
using SixLabors.ImageSharp;

namespace backend.Services
{
    public class CropRectangle
    {
        public CropRectangle()
        {
        }

        public CropRectangle(float left, float top, float right, float bottom)
        {
            if (left < 0.0)
                throw new ArgumentOutOfRangeException(nameof(left));
            if (top < 0.0)
                throw new ArgumentOutOfRangeException(nameof(top));
            if (right < 0.0)
                throw new ArgumentOutOfRangeException(nameof(right));
            if (bottom < 0.0)
                throw new ArgumentOutOfRangeException(nameof(bottom));
            Left = left;
            Top = top;
            Right = right;
            Bottom = bottom;
        }

        public float Left { get; set; }
        public float Top { get; set; }
        public float Right { get; set; }
        public float Bottom { get; set; }

        public CropLayer ToCropLayer => new CropLayer(left: Left,
            top: Top,
            right: Right,
            bottom: Bottom);

        public Rectangle ToRectangle =>
            new Rectangle((int) Left, (int) Top, (int) (Right - Left), (int) (Bottom - Top));
    }
}