namespace backend.Services
{
    public class Picture
    {
        public Picture(byte[] bytes, string filename)
        {
            AsBytes = bytes;
            Filename = filename;
        }

        public byte[] AsBytes { get; }
        public string Filename { get; }
    }
}