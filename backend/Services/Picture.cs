using System;
using System.IO;

namespace backend.Services
{
    public class Picture
    {
        public Picture(MemoryStream stream, string filename)
        {
            AsStream = stream;
            Filename = filename;
        }
        
        public Picture(byte[] bytes, string filename)
        {
            AsBytes = bytes;
            Filename = filename;
        }

        public MemoryStream AsStream { get; }
        public byte[] AsBytes { get; }
        public string Filename { get; }


        public Picture StreamMap(Action<MemoryStream, MemoryStream> f)
        {
            using (var inputStream = new MemoryStream(AsBytes))
            using (var outputStream = new MemoryStream())
            {
                f(inputStream, outputStream);
                return new Picture(outputStream.ToArray(), Filename);
            }
        }
    }
}