namespace backend.Services
{
    public interface IPictureModificator
    {
        Picture Crop(Picture picture, CropRectangle cropRectangle);
        Picture Rotate(Picture picture, float degrees);
        Picture AddText(Picture picture, string text);
        Picture AddBlackAndWhiteFilter(Picture picture);
        Picture AddSepiaFilter(Picture picture);
        Picture AddGaussianBlur(Picture picture, int size);
        Picture AddCircularBlur(Picture picture);
        Picture ToJPEG(Picture picture);
        Picture ToPNG(Picture picture);
    }

}
